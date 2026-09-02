"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient, SupabaseConfigurationError } from "@/lib/supabase/server";
import {
  dealerIdSchema,
  dealerSchema,
  type DealerActionState,
  type DealerFieldErrors,
} from "@/lib/validation/dealer";

const LOGIN_ERROR = "Email or password is incorrect.";
const ADMIN_ERROR = "Your session has expired. Please sign in again.";

async function getAuthenticatedClient() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims?.sub) return null;
  return supabase;
}

function dealerError(
  message: string,
  fieldErrors: DealerFieldErrors = {},
): DealerActionState {
  return { status: "error", message, fieldErrors };
}

export type LoginActionState = {
  status: "idle" | "error";
  message: string;
  fieldErrors: Partial<Record<"email" | "password", string[]>>;
};

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .pipe(z.email("Enter a valid email address.").max(254)),
  password: z
    .string()
    .min(1, "Password is required.")
    .max(512, "Password is too long."),
});

export async function signIn(
  _state: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword(parsed.data);

    if (error) {
      return { status: "error", message: LOGIN_ERROR, fieldErrors: {} };
    }
  } catch (error) {
    if (error instanceof SupabaseConfigurationError) {
      return {
        status: "error",
        message: "Admin login is not configured yet.",
        fieldErrors: {},
      };
    }

    return {
      status: "error",
      message: "Login is temporarily unavailable. Please try again.",
      fieldErrors: {},
    };
  }

  redirect("/admin/dealers");
}

export async function signOut() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut({ scope: "local" });
  } catch {
    // Redirect even if the provider is unavailable; stale cookies are handled
    // by the session proxy on the next request.
  }

  redirect("/admin/login");
}

export async function saveDealer(
  _state: DealerActionState,
  formData: FormData,
): Promise<DealerActionState> {
  const parsed = dealerSchema.safeParse({
    company_name: formData.get("company_name"),
    address: formData.get("address"),
    phone_number: formData.get("phone_number"),
  });

  if (!parsed.success) {
    return dealerError(
      "Please check the highlighted fields and try again.",
      z.flattenError(parsed.error).fieldErrors,
    );
  }

  const rawId = formData.get("id");
  const isEditing = typeof rawId === "string" && rawId !== "";
  const id = isEditing ? dealerIdSchema.safeParse(rawId) : null;

  if (id && !id.success) return dealerError("This dealer record is invalid.");

  try {
    const supabase = await getAuthenticatedClient();
    if (!supabase) return dealerError(ADMIN_ERROR);

    const query = isEditing
      ? supabase.from("dealers").update(parsed.data).eq("id", id!.data)
      : supabase.from("dealers").insert(parsed.data);
    const { error } = await query;

    if (error) {
      console.error(`[dealers] ${isEditing ? "update" : "create"} failed`);
      return dealerError(
        `The dealer could not be ${isEditing ? "updated" : "created"}. Please try again.`,
      );
    }
  } catch (error) {
    if (!(error instanceof SupabaseConfigurationError)) {
      console.error(`[dealers] ${isEditing ? "update" : "create"} failed`);
    }
    return dealerError("Dealer management is temporarily unavailable.");
  }

  revalidatePath("/dealers");
  revalidatePath("/admin/dealers");

  return {
    status: "success",
    message: `Dealer ${isEditing ? "updated" : "added"} successfully.`,
    fieldErrors: {},
  };
}

export async function deleteDealer(idValue: string): Promise<DealerActionState> {
  const id = dealerIdSchema.safeParse(idValue);
  if (!id.success) return dealerError("This dealer record is invalid.");

  try {
    const supabase = await getAuthenticatedClient();
    if (!supabase) return dealerError(ADMIN_ERROR);

    const { error } = await supabase.from("dealers").delete().eq("id", id.data);
    if (error) {
      console.error("[dealers] delete failed");
      return dealerError("The dealer could not be deleted. Please try again.");
    }
  } catch (error) {
    if (!(error instanceof SupabaseConfigurationError)) {
      console.error("[dealers] delete failed");
    }
    return dealerError("Dealer management is temporarily unavailable.");
  }

  revalidatePath("/dealers");
  revalidatePath("/admin/dealers");

  return {
    status: "success",
    message: "Dealer deleted successfully.",
    fieldErrors: {},
  };
}
