import { EditOutlined, FavoriteOutlined, PersonOutline, VisibilityOutlined } from "@mui/icons-material"
import { Box, Grid, MenuItem, Select, Typography, CircularProgress } from "@mui/material"
import { kGreenColor } from "../styles/colors"
import { useState } from 'react'
import { collectionData, docData } from "rxfire/firestore"
import {  statsQuery,allBlogsForAdminQuery, allViewsDataQuery, allLikesDataQuery, allUsers } from "../query/query"
import { useEffect } from "react"
import FullPageLoading from "../components/FullPageLoading"
import Navbar from "../components/NavBar"
import { VictoryBar, VictoryChart, VictoryGroup, VictoryLine, VictoryStack } from 'victory'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const daysCount = { 0: 31, 1: 28, 2: 31, 3: 30, 4: 31, 5: 30, 6: 31, 7: 31, 8: 30, 9: 31, 10: 30, 11: 31, }


const AdminDashBoard = () => {

    const initValue = () => {
        return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }

    const [loadingStat, setLoadingStat] = useState(false)

    const [blogs, setBlogs] = useState()
    const [users, setUsers] = useState()
    const [likesData, setLikesData] = useState()
    const [viewsData, setViewsData] = useState()

    const [blogsByMonth, setBlogsByMonth] = useState(initValue())
    const [registeredUsersByMonth, setRegisteredUsersByMonth] = useState(initValue())
    const [anonymousUsersByMonth, setAnonymousUsersByMonth] = useState(initValue())
    const [likesByMonth, setLikesByMonth] = useState(initValue())
    const [viewsByMonth, setViewsByMonth] = useState(initValue())

    const [loadingBlogs, setLoadingBlogs] = useState(false)
    const [loadingUsers, setLoadingUsers] = useState(false)
    const [loadingAnalytics, setLoadingAnalytics] = useState(false)



    const [usersFilterType, setUsersFillterType] = useState('ALLTIME')
    const [blogsFilterType, setBlogsFilterType] = useState('ALLTIME')
    const [analyticsFilterType, setAnalyticsFilterType] = useState('ALLTIME')


    const [stat, setStat] = useState()
    useEffect(() => {
        docData(statsQuery, { idField: 'id' })
            .subscribe(stat => {
                setStat(stat)
                setLoadingStat(false)
            })
        collectionData(allBlogsForAdminQuery, { idField: 'id' }).subscribe(blogs => {
            setLoadingBlogs(true)
            setBlogs(blogs)
            let date = new Date()
            let year = date.getFullYear()

            for (let i = 0; i < 12; i++) {
                let startDate = new Date(year, i, 1)
                let endeDate = new Date(year, i, daysCount[i])
                setBlogsByMonth((existing) => [
                    ...existing.slice(0, i),
                    blogs.filter(blog => blog.createdAt.toDate() > startDate && blog.createdAt.toDate() <= endeDate).length,
                    ...existing.slice(i + 1)
                ]);
            }

            setLoadingBlogs(false)

        })
        collectionData(allViewsDataQuery, { idField: 'id' }).subscribe(views => {
            setLoadingAnalytics(true)
            setViewsData(views)

            let date = new Date()
            let year = date.getFullYear()

            for (let i = 0; i < 12; i++) {
                let startDate = new Date(year, i, 1)
                let endeDate = new Date(year, i, daysCount[i])
                setViewsByMonth((existing) => [
                    ...existing.slice(0, i),
                    views.filter(view => view.timestamp.toDate() > startDate && view.timestamp.toDate() <= endeDate).length,
                    ...existing.slice(i + 1)
                ]);
            }

            setLoadingAnalytics(false)

        })
        collectionData(allLikesDataQuery, { idField: 'id' }).subscribe(likes => {
            setLoadingAnalytics(true)

            setLikesData(likes)
            let date = new Date()
            let year = date.getFullYear()
            for (let i = 0; i < 12; i++) {
                let startDate = new Date(year, i, 1)
                let endeDate = new Date(year, i, daysCount[i])
                setLikesByMonth((existing) => [
                    ...existing.slice(0, i),
                    likes.filter(like => like.timestamp.toDate() > startDate && like.timestamp.toDate() <= endeDate).length,
                    ...existing.slice(i + 1)
                ]);
            }

            setLoadingAnalytics(false)

        })

        collectionData(allUsers, { idField: 'id' }).subscribe(users => {
            setLoadingUsers(true)
            setLikesData(users)
            let date = new Date()
            let year = date.getFullYear()
            for (let i = 0; i < 12; i++) {
                let startDate = new Date(year, i, 1)
                let endeDate = new Date(year, i, daysCount[i])
                setRegisteredUsersByMonth((existing) => [
                    ...existing.slice(0, i),
                    users.filter(user => user.createdAt.toDate() > startDate && user.createdAt.toDate() <= endeDate && ['user', 'blogger'].includes(user.role)).length,
                    ...existing.slice(i + 1)
                ]);

                setAnonymousUsersByMonth((existing) => [
                    ...existing.slice(0, i),
                    users.filter(user => user.createdAt.toDate() > startDate && user.createdAt.toDate() <= endeDate && user.role === 'anonymous').length,
                    ...existing.slice(i + 1)
                ])
            }

            setLoadingUsers(false)
        })
        return () => {

        }
    }, [])

    return (
        <Box sx={{ backgroundColor: '#f5f5f5', width: '100vw', height: '100%' }} >
            <Navbar />
            {loadingStat && <FullPageLoading />}

            {!loadingStat && stat && <Grid container justifyContent='space-evenly' alignItems='center'>
                <DashboardComponent title='Total Blogs' count={stat.posts} icon={<EditOutlined sx={{ color: kGreenColor }} />} />
                <DashboardComponent title='Total User' count={(stat.registered_users || 0) + (stat.anonymous_users || 0)} icon={<PersonOutline sx={{ color: kGreenColor }} />} />
                <DashboardComponent title='Total View' count={stat.views} icon={<VisibilityOutlined sx={{ color: kGreenColor }} />} />
                <DashboardComponent title='Total Like' count={stat.likes} icon={<FavoriteOutlined sx={{ color: kGreenColor }} />} />
            </Grid>}

            <Grid container justifyContent='start' gap={1}>
                <Grid item sm={12} lg={5} sx={{ backgroundColor: 'white', m: 5, maxHeight: 430, textAlign: 'center', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', p: 5 }}>
                    <Grid container justifyContent='space-between' alignItems='center'>
                        <Grid container sx={{ px: 4, py: 1, backgroundColor: kGreenColor, width: 150, borderRadius: 2 }} justifyContent='space-between'>
                            <EditOutlined sx={{ color: 'white' }} />
                            <Typography sx={{ color: 'white', fontWeight: 'bold' }}>Blogs</Typography>
                        </Grid>

                        <Grid item>
                            <Select
                                sx={{ width: 170, height: 30, outlineColor: kGreenColor, border: `1px solid ${kGreenColor}` }}
                                value={blogsFilterType}
                                onChange={e => {
                                    setBlogsFilterType(e.target.value)
                                }}
                            >
                                <MenuItem value='ALLTIME'>All Time</MenuItem>
                                <MenuItem value='THISMONTH'>This Month</MenuItem>
                                <MenuItem value='THISWEEK'>This Week</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    {!loadingBlogs && <VictoryChart
                        domainPadding={{ x: 10 }}
                    >
                        <VictoryBar
                            style={{ data: { fill: 'black' } }}
                            animate={true}
                            labels={d => {
                                return null
                            }}
                            data={
                                blogsByMonth.map((val, index, a) => {
                                    return { x: ` ${months[index]}`, y: val }
                                })
                            }
                        />
                    </VictoryChart>}

                    {
                        loadingBlogs && <CircularProgress sx={{ color: kGreenColor }} />
                    }
                </Grid>
                <Grid item sm={12} lg={5} sx={{ backgroundColor: 'white', m: 5, maxHeight: 430, textAlign: 'center', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', p: 5 }}>
                    <Grid container sx={{ px: 3, py: 1, backgroundColor: kGreenColor, width: 150, borderRadius: 2 }} justifyContent='space-between'>
                        <EditOutlined sx={{ color: 'white' }} />
                        <Typography sx={{ color: 'white', fontWeight: 'bold' }}>Analytics</Typography>
                    </Grid>

                    {!loadingAnalytics && <VictoryChart>
                        <VictoryStack>
                            <VictoryLine
                                style={{
                                    data: { stroke: kGreenColor },
                                    parent: { border: "1px solid #ccc" }
                                }}
                                data={
                                    likesByMonth.map((val, index, a) => {
                                        return { x: ` ${months[index]}`, y: val }
                                    })
                                }
                            />
                        </VictoryStack>
                        <VictoryStack>
                            <VictoryLine
                                style={{
                                    data: { stroke: 'black' },
                                    parent: { border: "1px solid #ccc" }
                                }}
                                data={
                                    viewsByMonth.map((val, index, a) => {
                                        return { x: ` ${months[index]}`, y: val }
                                    })
                                }
                            />
                        </VictoryStack>
                    </VictoryChart>}

                    {
                        loadingAnalytics && <CircularProgress sx={{ color: kGreenColor }} />
                    }

                </Grid>


                <Grid item sm={12} lg={5} sx={{ backgroundColor: 'white', m: 5, maxHeight: 430, textAlign: 'center', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', p: 5 }}>
                    <Grid container sx={{ px: 4, py: 1, backgroundColor: kGreenColor, width: 150, borderRadius: 2 }} justifyContent='space-between'>
                        <EditOutlined sx={{ color: 'white' }} />
                        <Typography sx={{ color: 'white', fontWeight: 'bold' }}>Users</Typography>
                    </Grid>
                    {!loadingUsers && <VictoryChart

                        domainPadding={{ x: 50 }}

                    >
                        <VictoryGroup offset={20}>
                            <VictoryStack>
                                <VictoryBar
                                    cornerRadius={2}
                                    barWidth={15}
                                    style={{ data: { fill: kGreenColor } }}
                                    alignment="middle"
                                    animate={true}
                                    labels={d => {
                                        return null
                                    }}
                                    data={
                                        registeredUsersByMonth.map((val, index, a) => {
                                            return { x: ` ${months[index]}`, y: val }
                                        })
                                    }
                                />
                            </VictoryStack>
                            <VictoryStack>
                                <VictoryBar
                                    cornerRadius={2}
                                    barWidth={15}
                                    style={{ data: { fill: 'black' } }}
                                    alignment="middle"
                                    labels={d => {
                                        return null
                                    }}
                                    animate={true}
                                    data={
                                        anonymousUsersByMonth.map((val, index, a) => {
                                            return { x: ` ${months[index]}`, y: val }
                                        })
                                    }
                                />
                            </VictoryStack>
                        </VictoryGroup>
                    </VictoryChart>}
                    {
                        loadingUsers && <CircularProgress sx={{ color: kGreenColor }} />
                    }

                </Grid>
            </Grid>


        </Box>
    )
}

const DashboardComponent = ({ title, count, icon }) => {
    return (
        <Grid item>
            <Grid container sx={{ px: 5, py: 2, m: 2, backgroundColor: 'white', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: 2 }} direction='row' justifyContent='space-between' alignItems='center'>
                <Grid item sx={{ mr: 5 }}>
                    <Typography sx={{ fontSize: 12, color: '#444', pb: 1 }}>{title}</Typography>
                    <Typography sx={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>{count}</Typography>
                </Grid>
                <Grid item>
                    <Box sx={{ p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                        {icon}
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AdminDashBoard
