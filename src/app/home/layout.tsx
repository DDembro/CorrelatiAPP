import HomeSideNav from '@/components/home/home-sidenav'
import React from 'react'

const HomeLayout = ({ children }: any) => {
    return (
        <div className="flex h-full">
            <HomeSideNav />

            {children}
        </div>
    )
}

export default HomeLayout