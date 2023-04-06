import Navigation from './Navigation'
import Title from './Title'

type Props = {
  title: string,
}

function Header(props: Props) {
  const {
  title,
} = props;
  return (
    <>
        <Navigation/>
        <Title title={title}/>
    </>
  )
}

export default Header