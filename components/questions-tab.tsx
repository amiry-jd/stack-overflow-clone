import { SearchParamsProps } from '@/types/props';
import { getUserQuestions } from '@/actions/user.action';
import QuestionCard from './cards/question-card';
import Pagination from './pagination';
import { Suspense } from 'react';

interface Props extends SearchParamsProps {
  userId: string;
}

export default async function QuestionsTab(props: Props) {
  const userId = props.userId; 
   const searchParams = await props.searchParams; 
  const result = await getUserQuestions({ userId, page: Number(searchParams.page) || 1 });
  const { totalQuestions, userQuestions, isNext } = result;
  return (
    <>
      <div className="space-y-5">
        {userQuestions.map((question) => (
          <QuestionCard question={question} key={question._id} clerkId={question.author.clerkId} />
        ))}
      </div>
      <Suspense>
        <Pagination pageNumber={Number(searchParams.page) || 1} isNext={isNext} />
      </Suspense>
    </>
  );
}
