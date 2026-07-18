import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/20">
        <div className="mb-8 space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">YouthConnect</p>
          <h1 className="text-3xl font-semibold text-white">Reset your password</h1>
          <p className="text-sm text-slate-400">Enter your email and we’ll send a secure reset link.</p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
