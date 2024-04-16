import NavTop from '@/components/NavTop'
import NavTopMobile from '@/components/NavTopMobile'
import CreatePost from './CreatePost'
import useScreenWidth from '@/hooks/useScreen'
import GetAllTweet from './GetAllTweet'

export default function Tweets() {
    const isNonMobileScreens = useScreenWidth("560px");
  return (
    <>
        {isNonMobileScreens ? <NavTop /> : <NavTopMobile />}
          {isNonMobileScreens && <CreatePost onClose={close} isModel={false} />}
          <GetAllTweet/>

    </>
  )
}