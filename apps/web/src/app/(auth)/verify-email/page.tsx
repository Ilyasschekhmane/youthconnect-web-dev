import Link from 'next/link';

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/20">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">YouthConnect</p>
          <h1 className="text-3xl font-semibold text-white">Verify your email</h1>
          <p className="text-sm text-slate-400">Please check your inbox and follow the verification link before continuing.</p>
          <Link href="/login" className="inline-flex items-center text-sm font-medium text-cyan-400 hover:text-cyan-300">
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
