"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import NextLink from "next/link";
import {
  useParams as useNextParams,
  usePathname,
  useRouter,
  useSearchParams as useNextSearchParams,
} from "next/navigation";

export const Link = forwardRef(function Link(
  { to, replace = false, children, ...props },
  ref,
) {
  return (
    <NextLink ref={ref} href={to} replace={replace} {...props}>
      {children}
    </NextLink>
  );
});

export const NavLink = forwardRef(function NavLink(
  { to, end = false, className, children, ...props },
  ref,
) {
  const pathname = usePathname();
  const isActive = end
    ? pathname === to
    : pathname === to || pathname.startsWith(`${to}/`);
  const resolvedClassName =
    typeof className === "function" ? className({ isActive }) : className;

  return (
    <NextLink ref={ref} href={to} className={resolvedClassName} {...props}>
      {typeof children === "function" ? children({ isActive }) : children}
    </NextLink>
  );
});

export function useSearchParams() {
  const params = useNextSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const setParams = useCallback(
    (nextInit, options = {}) => {
      const nextParams = new URLSearchParams(nextInit);
      const query = nextParams.toString();
      const href = query ? `${pathname}?${query}` : pathname;
      const navigate = options.replace ? router.replace : router.push;
      navigate(href, { scroll: options.scroll ?? false });
    },
    [pathname, router],
  );

  return useMemo(() => [params, setParams], [params, setParams]);
}

export function useParams() {
  return useNextParams();
}

export function useLocation() {
  const pathname = usePathname();
  const [browserLocation, setBrowserLocation] = useState({
    hash: "",
    search: "",
  });

  useEffect(() => {
    const updateLocation = () => {
      setBrowserLocation({
        hash: window.location.hash,
        search: window.location.search,
      });
    };

    updateLocation();
    window.addEventListener("hashchange", updateLocation);
    return () => window.removeEventListener("hashchange", updateLocation);
  }, [pathname]);

  return {
    pathname,
    ...browserLocation,
  };
}

export function useNavigationType() {
  return "PUSH";
}

export function Outlet({ children = null }) {
  return children;
}
