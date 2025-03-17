import { InfoBlock } from '@/components/shared/info-block'
import { cn } from '@/lib/utils';

const NotAuthorizedPage = () => {
  return (
    <div className={cn("flex flex-col items-center justify-center mt-40")}>
      <InfoBlock
        title="Доступ запрещен"
        text="Для доступа к этой странице необходимо авторизоваться"
        imageUrl="/assets/images/lock.png"
      />
    </div>
  )
}

export default NotAuthorizedPage;