import { NextApiRequest, NextApiResponse } from 'next'

import { withSessionRoute } from '../../lib/server'

export type User = {
  isLoggedIn: boolean
  address?: string
  isAdmin?: boolean
}

export default withSessionRoute(userRoute)

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.siwe) {
    res.json({
      address: req.session.siwe.address,
      isAdmin: req.session.isAdmin,
      isLoggedIn: true,
    })
  } else {
    res.json({
      isLoggedIn: false,
    })
  }
}
