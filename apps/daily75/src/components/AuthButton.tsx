import type { Session } from "@supabase/supabase-js";
import { LogOut } from "lucide-react";

interface Props {
  session: Session | null;
  loading: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
}

export function AuthButton({ session, loading, onSignIn, onSignOut }: Props) {
  if (loading) return null;

  if (!session) {
    return (
      <button
        onClick={onSignIn}
        className="flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors hover:bg-accent"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Sign in with Google
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {session.user.user_metadata?.avatar_url && (
        <img
          src={session.user.user_metadata.avatar_url as string}
          alt="avatar"
          className="h-6 w-6 rounded-full"
        />
      )}
      <span className="text-xs text-muted-foreground">
        {session.user.user_metadata?.name ?? session.user.email}
      </span>
      <button
        onClick={onSignOut}
        className="rounded p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        title="Sign out"
      >
        <LogOut className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
