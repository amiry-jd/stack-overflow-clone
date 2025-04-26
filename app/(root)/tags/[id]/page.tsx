import { Metadata, ResolvingMetadata } from 'next';
import { SearchIcon } from 'lucide-react';
import { MetaDataProps, ParamsSearchProps } from '@/types/props';
import { getQuestionsByTagId } from '@/actions/tag.action';
import { tagQuestionNoResult } from '@/constants/no-result';
import LocalSearch from '@/components/local-search';
import NoResult from '@/components/no-result';
import QuestionCard from '@/components/cards/question-card';
import Pagination from '@/components/pagination';
import { Suspense } from 'react';

export async function generateMetadata(
  { params }: MetaDataProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = (await params).id;
  // fetch data
  const tag = await getQuestionsByTagId({ tagId: id });
  const { tagName } = tag;
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: `Dev Overflow | Tag - ${tagName}`,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  };
}

export default async function TagDetailsPage(props: ParamsSearchProps) {
  const params  = await props.params; 
  const searchParams = await props.searchParams;
  const tag = await getQuestionsByTagId({
    tagId: params.id,
    searchQuery: searchParams.q,
    page: Number(searchParams.page) || 1,
  });
  const { tagName, questions, isNext } = tag;

  return (
    <>
      <h1 className="h1-bold uppercase">{tagName}</h1>
      <div className="mt-11">
        <Suspense>
          <LocalSearch
          route={`/tags/${params.id}`}
          icon={<SearchIcon />}
          iconPosition="left"
          placeholder="Search tag questions"
          className="flex-1"
        />
        </Suspense>
      </div>
      <div className="mt-10 flex flex-col gap-5">
        {questions.length > 0 ? (
          questions.map((question: any) => <QuestionCard key={question._id} question={question} />)
        ) : (
          <NoResult
            title={tagQuestionNoResult.title}
            description={tagQuestionNoResult.description}
            buttonText={tagQuestionNoResult.buttonText}
            buttonLink={tagQuestionNoResult.buttonLink}
          />
        )}
      </div>
      <Suspense>
        <Pagination pageNumber={Number(searchParams.page) || 1} isNext={isNext} />
      </Suspense>
    </>
  );
}
