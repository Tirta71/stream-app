import { Link } from "react-router-dom";
import Button from "../ui/Button.jsx";
import FormInput from "../ui/FormInput.jsx";

const googleIconUrl =
  "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg";

function AuthFooterLink({ footerText, footerLink, className = "" }) {
  if (!footerText || !footerLink) {
    return null;
  }

  return (
    <p className={className}>
      {footerText}{" "}
      <Link
        className="font-semibold text-[rgba(255,255,255,0.96)]"
        to={footerLink.to}
      >
        {footerLink.text}
      </Link>
    </p>
  );
}

function AuthMeta({ footerText, footerLink, forgotPassword }) {
  if (!footerText || !footerLink) {
    return null;
  }

  if (forgotPassword) {
    return (
      <div className="-mt-2 flex items-center justify-between gap-3.5 text-base text-[rgba(193,194,196,0.88)] max-[640px]:text-xs">
        <AuthFooterLink
          footerText={footerText}
          footerLink={footerLink}
          className="m-0 max-[640px]:hidden"
        />
        <Link
          className="font-semibold text-[rgba(255,255,255,0.96)]"
          to={forgotPassword.to}
        >
          {forgotPassword.text}
        </Link>
      </div>
    );
  }

  return (
    <AuthFooterLink
      footerText={footerText}
      footerLink={footerLink}
      className="mb-0 mt-[-8px] text-base text-[rgba(193,194,196,0.88)] max-[640px]:hidden"
    />
  );
}

function AuthForm({
  fields,
  buttonText,
  footerText,
  footerLink,
  forgotPassword,
  error,
  googleButtonText,
  isGoogleSubmitting = false,
  isSubmitting = false,
  onChange,
  onGoogleLogin,
  onSubmit,
  successMessage,
  values = {},
  compact = false,
}) {
  const inputSize = compact ? "compact" : "default";
  const buttonSize = compact ? "authCompact" : "auth";
  const formClassName = compact
    ? "flex flex-col gap-5 max-[640px]:gap-3.5"
    : "flex flex-col gap-5 max-[640px]:gap-4";
  const resolvedGoogleButtonText =
    googleButtonText ?? `${buttonText} dengan Google`;

  return (
    <form className={formClassName} onSubmit={onSubmit}>
      {fields.map((field) => (
        <FormInput
          key={field.name}
          {...field}
          onChange={onChange}
          required={field.required ?? true}
          size={field.size ?? inputSize}
          value={values[field.name] ?? ""}
        />
      ))}

      {error ? (
        <div className="rounded-xl border border-[#ff7775]/30 bg-[#b71f1d]/20 px-4 py-3 text-sm font-semibold text-[#ffb1af] max-[640px]:text-xs">
          {error}
        </div>
      ) : null}

      {successMessage ? (
        <div className="rounded-xl border border-[#4dd889]/30 bg-[#0e7a3c]/20 px-4 py-3 text-sm font-semibold text-[#a7f3c6] max-[640px]:text-xs">
          {successMessage}
        </div>
      ) : null}

      <AuthMeta
        footerText={footerText}
        footerLink={footerLink}
        forgotPassword={forgotPassword}
      />

      <Button type="submit" size={buttonSize} disabled={isSubmitting}>
        {isSubmitting ? `${buttonText}...` : buttonText}
      </Button>

      <div className="-my-0.5 text-center text-base text-[rgba(193,194,196,0.88)] max-[640px]:text-sm">
        atau
      </div>

      <Button
        type="button"
        variant="outline"
        size={buttonSize}
        disabled={isGoogleSubmitting}
        onClick={onGoogleLogin}
      >
        <img
          className="h-6 w-6 object-contain"
          src={googleIconUrl}
          alt=""
          aria-hidden="true"
        />
        {isGoogleSubmitting ? "Memproses..." : resolvedGoogleButtonText}
      </Button>

      <AuthFooterLink
        footerText={footerText}
        footerLink={footerLink}
        className="hidden text-center text-sm text-[rgba(193,194,196,0.88)] max-[640px]:block"
      />
    </form>
  );
}

export default AuthForm;
