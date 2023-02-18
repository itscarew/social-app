import Layout from '@/components/Layout'
import ExploreCard from '@/components/ExploreCardComponent'
import SuggestCard from '@/components/SuggestCardComponent'

export default function Following() {
    return (
        <>
            <Layout>
                <div className="w-full min-h-screen p-4">
                    <div className='  max-w-screen-sm px-10 bg-white py-6 mx-4  rounded-lg md:mx-auto border-1' >
                        <h1 className='text-lg mb-3' >Suggested</h1>
                        <SuggestCard showHandle />
                        <SuggestCard showHandle />
                        <SuggestCard showHandle />
                        <SuggestCard showHandle />
                        <SuggestCard showHandle />
                        <SuggestCard showHandle />
                        <SuggestCard showHandle />
                        <SuggestCard showHandle />
                        <SuggestCard showHandle />
                        <SuggestCard showHandle />
                        <SuggestCard showHandle />
                        <SuggestCard showHandle />
                        <SuggestCard showHandle />
                        <SuggestCard showHandle />
                        <SuggestCard showHandle />
                        <SuggestCard showHandle />
                    </div>

                </div>





            </Layout>
        </>
    )
}
