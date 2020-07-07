import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Date from '../components/date'
import axios from 'axios'

export default function Home({
  allPostsData
}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
          {/* {allSSRData} */}
        </ul>
      </section>
    </Layout>
  )
}

// Fetch data before creating a page.
export const getStaticProps: GetStaticProps = async () => {
// export async function getStaticProps() { // JS expression
  const allPostsData = getSortedPostsData()
  // const response = await fetch("http://localhost:3000/api/getTest?query=0001029");
  const response = axios.get('http://localhost:3000/api/getTest?query=0001',{
    params: {
      ID: 12345,
    }
  });
  return {
    props: {
      allPostsData,
      // response
    }
  }
}

// Fetch external data then rendering HTML in every request.
// Server Side Rendering Implement
// export async function getServerSideProps(context) {
//   console.log(context.params)
//   const allSSRData = 'SSR'
//   return {
//     props: {
//       // コンポーネントに渡すための props
//       allSSRData,
//     }
//   }
// }