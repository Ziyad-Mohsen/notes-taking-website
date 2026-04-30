import { ROUTES } from "@/constants/routes";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAuthRoute = pathname.startsWith("/auth");
  const isCompleteProfile = pathname === ROUTES.COMPLETE_PROFILE;
  const isWorkspace = pathname.startsWith(ROUTES.WORKSPACE);

  if (user && isAuthRoute) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .single();

    console.log(profile, user);

    if (!profile && !isCompleteProfile) {
      return NextResponse.redirect(
        new URL(ROUTES.COMPLETE_PROFILE, request.url),
      );
    }

    if (profile && !isWorkspace) {
      return NextResponse.redirect(new URL(ROUTES.WORKSPACE, request.url));
    }
  }

  if (!user && isWorkspace) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  return response;
}
