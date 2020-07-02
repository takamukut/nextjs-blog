import Layout from '../../components/layout'
import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export default function Post({
  postData
}: {
  postData: {
    title: string
    date: string
    contentHtml: string
  }
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // id としてとりうる値のリストを返す
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false // falseの場合、ここでreturnされる以外のパスは全て404となる。
  }
}

// Fetch data before creating a page.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // params.id を使用して、ブログの投稿に必要なデータを取得する
  const postData = await getPostData(params.id as string)
  return {
    props: {
      postData
    }
  }
}
