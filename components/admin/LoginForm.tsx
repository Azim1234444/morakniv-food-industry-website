"use client";

import { useActionState } from "react";

import {
  FormField,
  controlBorder,
  controlClass,
} from "@/components/forms/FormField";
import { FormStatus } from "@/components/forms/FormStatus";
import { SubmitButton } from "@/components/forms/SubmitButton";
import {
  signIn,
  type LoginActionState,
} from "@/lib/actions/dealers";

const initialLoginActionState: LoginActionState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};

export function LoginForm() {
  const [state, action, pending] = useActionState(
    signIn,
    initialLoginActionState,
  );

  return (
    <form action={action} noValidate className="space-y-6">
      <FormStatus state={state} />

      <fieldset disabled={pending} className="space-y-5">
        <legend className="sr-only">Admin credentials</legend>

        <FormField
          name="email"
          label="Email"
          required
          errors={state.fieldErrors.email}
        >
          {(control) => (
            <input
              {...control}
              type="email"
              autoComplete="username"
              maxLength={254}
              className={`${controlClass} ${controlBorder(Boolean(state.fieldErrors.email))}`}
            />
          )}
        </FormField>

        <FormField
          name="password"
          label="Password"
          required
          errors={state.fieldErrors.password}
        >
          {(control) => (
            <input
              {...control}
              type="password"
              autoComplete="current-password"
              maxLength={512}
              className={`${controlClass} ${controlBorder(Boolean(state.fieldErrors.password))}`}
            />
          )}
        </FormField>

        <SubmitButton
          pending={pending}
          pendingLabel="Signing in"
          className="w-full"
        >
          Sign in
        </SubmitButton>
      </fieldset>
    </form>
  );
}
