import PageAnimation from '@components/animation/page'
import PostManagerContainer from '@containers/posts'
import React from 'react'

type PostManagerPageProps = {}

const PostManagerPage: React.FC<React.PropsWithChildren<PostManagerPageProps>> = () => {
  return (
    <PageAnimation>
      <PostManagerContainer />
    </PageAnimation>
  )
}

export default PostManagerPage
