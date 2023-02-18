import Layout from '@/components/Layout'
import ProfileComponent from '@/components/ProfileComponent'

export default function Profile() {
    return (
        <>
            <Layout>
                <div className="w-full min-h-screen p-4">
                    <ProfileComponent />
                </div>
            </Layout>
        </>
    )
}
