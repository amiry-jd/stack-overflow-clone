import { Metadata } from 'next';
import { auth } from '@clerk/nextjs/server';
import { getQuestionById } from '@/actions/question.action';
import QuestionForm from '@/components/forms/question-form';

export const metadata: Metadata = {
  title: 'Dev Overflow | Edit Question',
  description:
    'Edit your question. Get unstuck, share ideas, and learn together. Join us, it only takes a minute.',
};

export default async function EditQuestionPage(props:{ params: Promise< { id: string }> }) {
  
  const { userId } = await auth();

  const params = await props.params;
  const question = await getQuestionById(params.id);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>
      <div className="mt-9">
        <QuestionForm type="Edit" userId={userId!} questionDetails={JSON.stringify(question)} />
      </div>
    </>
  );
}
