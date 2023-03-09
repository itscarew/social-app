import withAuth from '@/components/HOC/WithAuth'
import Layout from '@/components/Layout'
import NotificationCard from '@/components/NotificationComponents'

export default withAuth(function Notification() {
    return (
        <>
            <Layout>
                <div className="w-full min-h-screen p-4">
                    <h1 className='mb-6' >Notifications</h1>
                    <NotificationCard />
                    <NotificationCard />
                    <NotificationCard />
                    <NotificationCard />
                    <NotificationCard />
                    <NotificationCard />
                </div>
            </Layout>
        </>
    )
})
