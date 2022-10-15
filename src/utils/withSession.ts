import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler
} from 'next'
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'
import {
  COOKIE_NAME,
  SECRET_COOKIE_PASSWORD,
  __prod__
} from '../helpers/constants'

export const sessionOptions = {
  password: `${SECRET_COOKIE_PASSWORD}`,
  cookieName: `${COOKIE_NAME}`,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: __prod__
  }
}

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions)
}

// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, sessionOptions)
}
