import { getUserAnswers } from '@/actions/user.action';
import AnswerCard from './cards/answer-card';
import { SearchParamsProps } from '@/types/props';
import Pagination from './pagination';
import { Suspense } from 'react';

interface Props extends SearchParamsProps {
  userId: string;
}

export default async function AnswerTabs(props: Props) {
  const userId = props.userId;
  const searchParams = await props.searchParams
  const result = await getUserAnswers({ userId, page: Number(searchParams.page) || 1 });
  const { totalAnswers, userAnswers, isNext } = result;

  return (
    <>
      <div className="space-y-5">
        {userAnswers.map((answer) => (
          <AnswerCard key={answer._id} answer={answer} clerkId={answer.author.clerkId} />
        ))}
      </div>
      <Suspense>
        <Pagination pageNumber={Number(searchParams.page) || 1} isNext={isNext} />
      </Suspense>
    </>
  );
}
