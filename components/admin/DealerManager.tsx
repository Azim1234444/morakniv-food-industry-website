"use client";

import { useActionState, useCallback, useEffect, useState, useTransition } from "react";

import {
  FormField,
  controlBorder,
  controlClass,
} from "@/components/forms/FormField";
import { FormStatus } from "@/components/forms/FormStatus";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { Button } from "@/components/ui/Button";
import { deleteDealer, saveDealer } from "@/lib/actions/dealers";
import type { Dealer } from "@/lib/dealers";
import {
  initialDealerActionState,
  type DealerActionState,
} from "@/lib/validation/dealer";

type EditableDealer = Pick<
  Dealer,
  "id" | "company_name" | "address" | "phone_number"
>;

type DealerManagerProps = {
  dealers: Dealer[];
  loadError?: string;
};

const emptyValues: EditableDealer = {
  id: "",
  company_name: "",
  address: "",
  phone_number: "",
};

export function DealerManager({ dealers, loadError }: DealerManagerProps) {
  const [editing, setEditing] = useState<EditableDealer | null>(null);
  const [notice, setNotice] = useState<DealerActionState | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletePending, startDeleteTransition] = useTransition();

  const closeForm = useCallback((result?: DealerActionState) => {
    setEditing(null);
    if (result) setNotice(result);
  }, []);

  const openAdd = () => {
    setNotice(null);
    setEditing(emptyValues);
  };

  const openEdit = (dealer: Dealer) => {
    setNotice(null);
    setEditing({
      id: dealer.id,
      company_name: dealer.company_name,
      address: dealer.address,
      phone_number: dealer.phone_number,
    });
  };

  const confirmDelete = (dealer: Dealer) => {
    if (!window.confirm(`Delete ${dealer.company_name}?`)) return;

    setNotice(null);
    setDeletingId(dealer.id);
    startDeleteTransition(async () => {
      const result = await deleteDealer(dealer.id);
      setNotice(result);
      setDeletingId(null);
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-medium text-ink">Dealers</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            Add and maintain the dealer details shown on the public website.
          </p>
        </div>
        <Button type="button" onClick={openAdd} className="w-full sm:w-auto">
          Add dealer
        </Button>
      </div>

      <div className="mt-6">
        {notice ? <FormStatus state={notice} /> : null}
        {loadError ? (
          <div role="alert" className="border-l-2 border-brand bg-brand-tint px-4 py-3.5 text-sm text-ink">
            {loadError}
          </div>
        ) : null}
      </div>

      {editing ? (
        <DealerForm
          key={editing.id || "new"}
          dealer={editing}
          onCancel={() => setEditing(null)}
          onSaved={closeForm}
        />
      ) : null}

      {!loadError && dealers.length === 0 ? (
        <div className="mt-8 border border-line bg-surface-alt px-6 py-10 text-center">
          <h3 className="text-lg font-medium text-ink">No dealers yet</h3>
          <p className="mt-2 text-sm text-ink-muted">
            Add the first dealer to publish it on the public dealer page.
          </p>
        </div>
      ) : null}

      {dealers.length > 0 ? (
        <>
          <div className="mt-8 hidden overflow-x-auto border border-line md:block">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead className="bg-surface-alt">
                <tr className="border-b border-line">
                  {['Company', 'Address', 'Phone', 'Actions'].map((heading) => (
                    <th key={heading} scope="col" className="label-eyebrow px-5 py-4 text-ink-subtle">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {dealers.map((dealer) => (
                  <tr key={dealer.id}>
                    <th scope="row" className="w-1/4 px-5 py-5 align-top text-sm font-medium text-ink">
                      {dealer.company_name}
                    </th>
                    <td className="w-2/5 whitespace-pre-line px-5 py-5 align-top text-sm leading-relaxed text-ink-muted">
                      {dealer.address}
                    </td>
                    <td className="px-5 py-5 align-top text-sm whitespace-nowrap text-ink-muted">
                      {dealer.phone_number}
                    </td>
                    <td className="px-5 py-5 align-top">
                      <DealerActions
                        dealer={dealer}
                        disabled={deletePending}
                        deleting={deletingId === dealer.id}
                        onEdit={() => openEdit(dealer)}
                        onDelete={() => confirmDelete(dealer)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mt-8 space-y-4 md:hidden">
            {dealers.map((dealer) => (
              <li key={dealer.id} className="border border-line bg-surface p-5">
                <h3 className="text-base font-medium text-ink">{dealer.company_name}</h3>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink-muted">
                  {dealer.address}
                </p>
                <p className="mt-3 text-sm text-ink-muted">{dealer.phone_number}</p>
                <div className="mt-5 border-t border-line pt-4">
                  <DealerActions
                    dealer={dealer}
                    disabled={deletePending}
                    deleting={deletingId === dealer.id}
                    onEdit={() => openEdit(dealer)}
                    onDelete={() => confirmDelete(dealer)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}

function DealerActions({
  dealer,
  disabled,
  deleting,
  onEdit,
  onDelete,
}: {
  dealer: Dealer;
  disabled: boolean;
  deleting: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" aria-label={`Actions for ${dealer.company_name}`}>
      <Button type="button" variant="secondary" size="sm" onClick={onEdit} disabled={disabled}>
        Edit
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={onDelete} disabled={disabled} className="text-brand hover:bg-brand-tint">
        {deleting ? "Deleting…" : "Delete"}
      </Button>
    </div>
  );
}

function DealerForm({
  dealer,
  onCancel,
  onSaved,
}: {
  dealer: EditableDealer;
  onCancel: () => void;
  onSaved: (result: DealerActionState) => void;
}) {
  const [state, action, pending] = useActionState(
    saveDealer,
    initialDealerActionState,
  );

  useEffect(() => {
    if (state.status === "success") onSaved(state);
  }, [onSaved, state]);

  return (
    <div className="mt-8 border border-line-strong bg-surface-alt p-5 sm:p-7">
      <h3 className="text-xl font-medium text-ink">
        {dealer.id ? "Edit dealer" : "Add dealer"}
      </h3>

      <form action={action} className="mt-6 space-y-6">
        <input type="hidden" name="id" value={dealer.id} />
        <FormStatus state={state} />

        <fieldset disabled={pending} className="space-y-5">
          <legend className="sr-only">Dealer details</legend>

          <FormField name="company_name" label="Company Name" required errors={state.fieldErrors.company_name}>
            {(control) => (
              <input
                {...control}
                type="text"
                defaultValue={dealer.company_name}
                minLength={2}
                maxLength={160}
                autoComplete="organization"
                className={`${controlClass} ${controlBorder(Boolean(state.fieldErrors.company_name))}`}
              />
            )}
          </FormField>

          <FormField name="address" label="Address" required errors={state.fieldErrors.address}>
            {(control) => (
              <textarea
                {...control}
                rows={4}
                defaultValue={dealer.address}
                minLength={5}
                maxLength={500}
                autoComplete="street-address"
                className={`${controlClass} resize-y ${controlBorder(Boolean(state.fieldErrors.address))}`}
              />
            )}
          </FormField>

          <FormField
            name="phone_number"
            label="Phone Number"
            hint="Malaysian formats such as 03-1234 5678, 012-345 6789 or +60 12-345 6789 are accepted."
            required
            errors={state.fieldErrors.phone_number}
          >
            {(control) => (
              <input
                {...control}
                type="tel"
                inputMode="tel"
                defaultValue={dealer.phone_number}
                minLength={7}
                maxLength={40}
                pattern="\+?[0-9() .-]+"
                autoComplete="tel"
                className={`${controlClass} ${controlBorder(Boolean(state.fieldErrors.phone_number))}`}
              />
            )}
          </FormField>

          <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
            <Button type="button" variant="secondary" onClick={onCancel} disabled={pending} className="w-full sm:w-auto">
              Cancel
            </Button>
            <SubmitButton pending={pending} pendingLabel="Saving" className="w-full sm:w-auto">
              Save Dealer
            </SubmitButton>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
