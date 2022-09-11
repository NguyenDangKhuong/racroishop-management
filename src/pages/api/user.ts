import { withIronSessionApiRoute } from "iron-session/next"
import { NextApiRequest, NextApiResponse } from "next"
import { sessionOptions } from "../../utils/withSession"

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.status(200).json({
      ...req.session.user
    });
  } else {
    res.status(401).json({
      isLoggedIn: false,
      login: "",
      avatarUrl: "",
    });
  }
}
