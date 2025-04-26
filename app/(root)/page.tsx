import { Metadata } from 'next';
import Link from 'next/link';
import { SearchIcon } from 'lucide-react';
import Filter from '../../components/filter';
import HomeFilter from './_components/home-filter';
import { HomePageFilters } from '@/constants/filters';
import { questionNoResult } from '@/constants/no-result';
import LocalSearch from '@/components/local-search';
import QuestionCard from '@/components/cards/question-card';
import NoResult from '@/components/no-result';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { getAllQuestions } from '@/actions/question.action';
import { auth } from '@clerk/nextjs/server';
import { SearchParamsProps } from '@/types/props';
import Pagination from '@/components/pagination';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Dev Overflow | Home',
  description:
    'Dev Overflow is a community of developers, where you can ask questions and receive answers from other members of the community.',
};

export default async function Home(props: SearchParamsProps) {
  // const questions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { userId } = await auth();
  const searchParams = await props.searchParams;
  const result = await getAllQuestions({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: Number(searchParams.page) || 1,
  });
  const { questions, isNext } = result;

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className="h1-bold">All Questions</h1>
        <Link href="ask-question" className={cn(buttonVariants(), 'primary-gradient text-white')}>
          Ask a question
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
          <Suspense>
            <LocalSearch
              route="/"
              icon={<SearchIcon />}
              iconPosition="left"
              placeholder="Search for questions"
              className="flex-1"
            />
          </Suspense>
        <Suspense>
          <Filter filters={HomePageFilters} containerClass="sm:min-w-[170px] md:hidden" />
        </Suspense>
      </div>
      <Suspense>
        <HomeFilter />
      </Suspense>
      <div className="mt-10 flex flex-col gap-5">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard key={question._id} question={question} clerkId={userId!} />
          ))
        ) : (
          <NoResult
            title={questionNoResult.title}
            description={questionNoResult.description}
            buttonText={questionNoResult.buttonText}
            buttonLink={questionNoResult.buttonLink}
          />
        )}
      </div>
      <Suspense>
        <Pagination pageNumber={Number(searchParams.page) || 1} isNext={isNext} />  
      </Suspense>      
    </>
  );
}
