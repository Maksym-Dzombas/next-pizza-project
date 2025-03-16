import { InfoBlock } from '@/components/shared/info-block'

type Props = {}

const NotAuthorizedPage = ({ }: Props) => {
  console.log("Рендер страницы NotAuthorizedPage");

  return (
    <div className='flex flex-col items-center justify-center mt-40'>
      <InfoBlock
        title="Доступ запрещен"
        text="Для доступа к этой странице необходимо авторизоваться"
        imageUrl="/assets/images/lock.png"
      />
    </div>
  )
}

export default NotAuthorizedPage;