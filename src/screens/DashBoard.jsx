import { EditOutlined, FavoriteOutlined, GraphicEqOutlined, PersonOutline, VisibilityOutlined } from "@mui/icons-material"
import { Box, Grid, MenuItem, Select, Typography, CircularProgress } from "@mui/material"
import { kGreenColor } from "../styles/colors"
import { useState } from 'react'
import { collectionData, docData } from "rxfire/firestore"
import { statsQuery, allBlogsForAdminQuery, allViewsDataQuery, allLikesDataQuery, allUsers } from "../query/query"
import { useEffect } from "react"
import FullPageLoading from "../components/FullPageLoading"
import Navbar from "../components/NavBar"
import { VictoryBar, VictoryChart, VictoryGroup, VictoryLine, VictoryStack } from 'victory'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const daysCount = { 0: 31, 1: 28, 2: 31, 3: 30, 4: 31, 5: 30, 6: 31, 7: 31, 8: 30, 9: 31, 10: 30, 11: 31, }


const AdminDashBoard = () => {

    const initValue = () => {
        return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((val, index) => {
            return { x: ` ${months[index]}`, y: val }
        })
    }

    const getInitValueByDate = () => {
        let d = new Date()
        let value = []
        for (let i = 0; i < daysCount[d.getMonth()]; i++) {
            value.push(0)
        }
        console.log(value)
        return value.map((val, index) => {
            return { x: `${index}`, y: val }
        })
    }

    const [loadingStat, setLoadingStat] = useState(false)

    const [blogs, setBlogs] = useState()
    const [users, setUsers] = useState()
    const [likesData, setLikesData] = useState()
    const [viewsData, setViewsData] = useState()

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
            setLoadingBlogs(false)

        })
        collectionData(allViewsDataQuery, { idField: 'id' }).subscribe(views => {
            setLoadingAnalytics(true)
            setViewsData(views)
            setLoadingAnalytics(false)

        })
        collectionData(allLikesDataQuery, { idField: 'id' }).subscribe(likes => {
            setLoadingAnalytics(true)
            setLikesData(likes)
            setLoadingAnalytics(false)

        })

        collectionData(allUsers, { idField: 'id' }).subscribe(users => {
            setLoadingUsers(true)
            setUsers(users)
            setLoadingUsers(false)
        })
        return () => {

        }
    }, [])

    const getBlogsData = () => {
        let date = new Date()
        let year = date.getFullYear()
        //return parsed and formatted data based on the selected preference
        if (blogsFilterType === 'ALLTIME') {
            let value = initValue()
            for (let i = 0; i < 12; i++) {
                let startDate = new Date(year, i, 1)
                let endeDate = new Date(year, i, daysCount[i])
                console.log(startDate, endeDate)
                value = [...value.slice(0, i), blogs.filter(blog => blog.createdAt.toDate() >= startDate && blog.createdAt.toDate() <= endeDate).length, ...value.slice(i + 1)]
            }
            let current = new Date()
            let reversed = value.reverse()
            let newData = [...reversed.slice(12 - current.getMonth() - 1), ...reversed.slice(0, 12 - current.getMonth() - 1)]
            let a = newData.map((val, index) => {
                return { x: ` ${months[index]}`, y: val }
            })

            return a
        }
        else if (blogsFilterType === 'THISWEEK') {
            let end = new Date()
            end.setDate(end.getDate() - 7)
            let value = initValue().slice(0, 7)

            for (let i = 0; i < 7; i++) {
                let newDate = new Date()
                // console.log('today', newDate.getDay())
                newDate.setDate(newDate.getDate() - i)
                console.log('in date', newDate)
                // console.log(`before ${i} days`, newDate.getDay())

                value = [...value.slice(0, i), blogs.filter(blog => {
                    console.log(blog.createdAt.toDate() > end)
                    return (blog.createdAt.toDate().getDay() === newDate.getDay() && blog.createdAt.toDate() >= end)
                }).length, ...value.slice(i + 1)]
            }
            let current = new Date()
            let reversed = value.reverse()
            let newData = [...reversed.slice(7 - current.getDay() - 1), ...reversed.slice(0, 7 - current.getDay() - 1)]
            let a = newData.map((val, index) => {
                return { x: ` ${days[index]}`, y: val }
            })
            // console.log(a)

            return a
        }
        else if (blogsFilterType === 'THISMONTH') {
            let value = getInitValueByDate()
            console.log(value)
            let before30Days = new Date()
            before30Days.setDate(before30Days.getDate() - 30)

            for (let i = 0; i < daysCount[(new Date()).getMonth()]; i++) {
                let newDate = new Date()
                // console.log('today', newDate.getDay())
                newDate.setDate(newDate.getDate() - i)
                // console.log(`before ${i} days`, newDate.getDay())

                value = [...value.slice(0, i), blogs.filter(blog => {
                    // console.log('blogs day',)
                    return (blog.createdAt.toDate().getDate() === newDate.getDate() && blog.createdAt.toDate() >= before30Days)
                }).length, ...value.slice(i + 1)]
            }
            console.log(value)
            return value.map((val, index) => {
                return { x: ` ${index + 1}`, y: val }
            })
            // return getInitValueByDate()
        }
        else {
            return initValue()
        }
    }

    const getViewsData = () => {
        let date = new Date()
        let year = date.getFullYear()
        let value = initValue()
        //return parsed and formatted data based on the selected preference
        if (analyticsFilterType === 'ALLTIME') {
            for (let i = 0; i < 12; i++) {
                let startDate = new Date(year, i, 1)
                let endeDate = new Date(year, i, daysCount[i])
                value = [...value.slice(0, i), viewsData.filter(view => view.timestamp.toDate() > startDate && view.timestamp.toDate() <= endeDate).length, ...value.slice(i + 1)]
            }

            let current = new Date()
            let reversed = value.reverse()
            let newData = [...reversed.slice(12 - current.getMonth() - 1), ...reversed.slice(0, 12 - current.getMonth() - 1)]
            let a = newData.map((val, index) => {
                return { x: ` ${months[index]}`, y: val }
            })

            return a
        }

        else if (analyticsFilterType === 'THISWEEK') {
            let end = new Date()
            end.setDate(end.getDate() - 7)
            let value = initValue().slice(0, 7)

            for (let i = 0; i < 7; i++) {
                let newDate = new Date()
                // console.log('today', newDate.getDay())
                newDate.setDate(newDate.getDate() - i)
                // console.log(`before ${i} days`, newDate.getDay())

                value = [...value.slice(0, i), viewsData.filter(blog => {
                    // console.log('blogs day',)
                    return (blog.timestamp.toDate().getDay() === newDate.getDay() && blog.timestamp.toDate() >= end)
                }).length, ...value.slice(i + 1)]
            }
            let current = new Date()
            let reversed = value.reverse()
            let newData = [...reversed.slice(7 - current.getDay() - 1), ...reversed.slice(0, 7 - current.getDay() - 1)]
            let a = newData.map((val, index) => {
                return { x: ` ${days[index]}`, y: val }
            })

            return a
        }
        else {
            return initValue()
        }
    }

    const getLikesData = () => {
        let date = new Date()
        let year = date.getFullYear()
        let value = initValue()
        //return parsed and formatted data based on the selected preference
        if (analyticsFilterType === 'ALLTIME') {
            for (let i = 0; i < 12; i++) {
                let startDate = new Date(year, i, 1)
                let endeDate = new Date(year, i, daysCount[i])
                value = [...value.slice(0, i), likesData.filter(like => like.timestamp.toDate() > startDate && like.timestamp.toDate() <= endeDate).length, ...value.slice(i + 1)]
            }
            let current = new Date()
            let reversed = value.reverse()
            let newData = [...reversed.slice(12 - current.getMonth() - 1), ...reversed.slice(0, 12 - current.getMonth() - 1)]
            let a = newData.map((val, index) => {
                return { x: ` ${months[index]}`, y: val }
            })

            return a
        }
        else if (analyticsFilterType === 'THISWEEK') {
            let end = new Date()
            end.setDate(end.getDate() - 7)
            let value = initValue().slice(0, 7)

            for (let i = 0; i < 7; i++) {
                let newDate = new Date()
                // console.log('today', newDate.getDay())
                newDate.setDate(newDate.getDate() - i)
                // console.log(`before ${i} days`, newDate.getDay())

                value = [...value.slice(0, i), likesData.filter(blog => {
                    // console.log('blogs day',)
                    return (blog.timestamp.toDate().getDay() === newDate.getDay() && blog.timestamp.toDate() >= end)
                }).length, ...value.slice(i + 1)]
            }
            // console.log(values)
            let current = new Date()
            let reversed = value.reverse()
            let newData = [...reversed.slice(7 - current.getDay() - 1), ...reversed.slice(0, 7 - current.getDay() - 1)]
            let a = newData.map((val, index) => {
                return { x: ` ${days[index]}`, y: val }
            })
            return a
        }
        else {
            return initValue()
        }
    }

    const getAnonymousUsersData = () => {
        let date = new Date()
        let year = date.getFullYear()
        let value = initValue()
        //return parsed and formatted data based on the selected preference
        if (usersFilterType === 'ALLTIME') {
            for (let i = 0; i < 12; i++) {
                let startDate = new Date(year, i, 1)
                let endeDate = new Date(year, i, daysCount[i])
                value = [...value.slice(0, i), users.filter(user => user.createdAt.toDate() > startDate && user.createdAt.toDate() <= endeDate && user.role === 'anonymous').length, ...value.slice(i + 1)]
            }
            let current = new Date()
            let reversed = value.reverse()
            let newData = [...reversed.slice(12 - current.getMonth() - 1), ...reversed.slice(0, 12 - current.getMonth() - 1)]
            let a = newData.map((val, index) => {
                return { x: ` ${months[index]}`, y: val }
            })

            return a
        }

        else if (usersFilterType === 'THISWEEK') {
            let end = new Date()
            end.setDate(end.getDate() - 7)
            let value = initValue().slice(0, 7)

            for (let i = 0; i < 7; i++) {
                let newDate = new Date()
                //subtract to get the date before i days
                newDate.setDate(newDate.getDate() - i)
                value = [...value.slice(0, i), users.filter(user => {
                    return user.createdAt.toDate().getDay() === newDate.getDay() && user.role === 'anonymous' && user.createdAt.toDate() > end
                }).length, ...value.slice(i + 1)]
            }
            let current = new Date()
            let reversed = value.reverse()
            let newData = [...reversed.slice(7 - current.getDay() - 1), ...reversed.slice(0, 7 - current.getDay() - 1)]
            let a = newData.map((val, index) => {
                return { x: ` ${days[index]}`, y: val }
            })
            return a
        }
        else {
            return initValue()
        }
    }


    const getRegisteredUsersData = () => {
        let date = new Date()
        let year = date.getFullYear()
        let value = initValue()
        if (usersFilterType === 'ALLTIME') {
            for (let i = 0; i < 12; i++) {
                let startDate = new Date(year, i, 1)
                let endeDate = new Date(year, i, daysCount[i])
                value = [...value.slice(0, i), users.filter(user => user.createdAt.toDate() > startDate && user.createdAt.toDate() <= endeDate && ['user', 'blogger'].includes(user.role)).length, ...value.slice(i + 1)]
            }
            let current = new Date()
            let reversed = value.reverse()
            let newData = [...reversed.slice(12 - current.getMonth() - 1), ...reversed.slice(0, 12 - current.getMonth() - 1)]
            let a = newData.map((val, index) => {
                return { x: ` ${months[index]}`, y: val }
            })

            return a
        }

        else if (usersFilterType === 'THISWEEK') {
            let end = new Date()
            end.setDate(end.getDate() - 7)
            let value = initValue().slice(0, 7)


            for (let i = 0; i < 7; i++) {
                let newDate = new Date()
                //subtract to get the date before i days
                newDate.setDate(newDate.getDate() - i)
                value = [...value.slice(0, i), users.filter(user => {
                    return user.createdAt.toDate().getDay() === newDate.getDay() && ['user', 'blogger'].includes(user.role) && user.createdAt.toDate() > end
                }).length, ...value.slice(i + 1)]
            }
            let current = new Date()
            let reversed = value.reverse()
            let newData = [...reversed.slice(7 - current.getDay() - 1), ...reversed.slice(0, 7 - current.getDay() - 1)]
            let a = newData.map((val, index) => {
                return { x: ` ${days[index]}`, y: val }
            })
            return a
        }

        else {
            return initValue()
        }
    }

    return (
        <Box sx={{ backgroundColor: '#f5f5f5', width: '100vw', height: '100%' }} >
            <Navbar />
            {loadingStat && <FullPageLoading />}

            {!loadingStat && stat && <Grid container justifyContent='space-evenly' alignItems='center'>
                <DashboardComponent title='Total Blogs' count={blogs && blogs.length} icon={<EditOutlined sx={{ color: kGreenColor }} />} />
                <DashboardComponent title='Total User' count={users && users.length} icon={<PersonOutline sx={{ color: kGreenColor }} />} />
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
                                <MenuItem value='THISWEEK'>This Week</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    {!loadingBlogs && blogs &&
                        <VictoryChart
                            domainPadding={{ x: 30 }}
                        >
                            <VictoryBar
                                cornerRadius={2}
                                barWidth={10}
                                style={{ data: { fill: 'black' } }}
                                alignment="middle"
                                animate={true}
                                labels={d => {
                                    return null
                                }}
                                data={
                                    getBlogsData()
                                }
                            />
                        </VictoryChart>}


                    {
                        loadingBlogs && <CircularProgress sx={{ color: kGreenColor }} />
                    }
                </Grid>
                <Grid item sm={12} lg={5} sx={{ backgroundColor: 'white', m: 5, maxHeight: 430, textAlign: 'center', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', p: 5 }}>
                    <Grid container justifyContent='space-between' alignItems='center'>
                        <Grid container sx={{ px: 3, py: 1, backgroundColor: kGreenColor, width: 160, borderRadius: 2 }} justifyContent='space-between'>
                            <GraphicEqOutlined sx={{ color: 'white' }} />
                            <Typography sx={{ color: 'white', fontWeight: 'bold' }}>Analytics</Typography>
                        </Grid>

                        <Grid item>
                            <Select
                                sx={{ width: 170, height: 30, outlineColor: kGreenColor, border: `1px solid ${kGreenColor}` }}
                                value={analyticsFilterType}
                                onChange={e => {
                                    setAnalyticsFilterType(e.target.value)
                                }}
                            >
                                <MenuItem value='ALLTIME'>All Time</MenuItem>
                                <MenuItem value='THISWEEK'>This Week</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    {
                        !loadingAnalytics && likesData && viewsData &&
                        <Box sx={{ my: 1 }}>
                            <span style={{ color: kGreenColor, fontSize: 13 }}>Likes </span>
                            <span style={{ color: 'black', fontSize: 13 }}> Views</span>
                        </Box>
                    }

                    {!loadingAnalytics && likesData && viewsData &&
                        <VictoryChart domainPadding={{ x: 50 }}>
                            <VictoryGroup offset={20}>

                                <VictoryStack >

                                    <VictoryLine
                                        animate={true}
                                        style={{
                                            data: { stroke: kGreenColor },
                                            parent: { border: "1px solid #ccc" }
                                        }}
                                        data={
                                            getLikesData()
                                        }
                                    />
                                </VictoryStack>
                                <VictoryStack>
                                    <VictoryLine
                                        animate={true}
                                        style={{
                                            data: { stroke: 'black' },
                                            parent: { border: "1px solid #ccc" }
                                        }}
                                        data={
                                            getViewsData()
                                        }
                                    />
                                </VictoryStack>
                            </VictoryGroup>

                        </VictoryChart>}


                    {
                        loadingAnalytics && <CircularProgress sx={{ color: kGreenColor }} />
                    }

                </Grid>


                <Grid item sm={12} lg={5} sx={{ backgroundColor: 'white', m: 5, maxHeight: 550, textAlign: 'center', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', p: 5 }}>
                    <Grid container justifyContent='space-between' alignItems='center'>
                        <Grid container sx={{ px: 3, py: 1, backgroundColor: kGreenColor, width: 160, borderRadius: 2 }} justifyContent='space-between'>
                            <PersonOutline sx={{ color: 'white' }} />
                            <Typography sx={{ color: 'white', fontWeight: 'bold' }}>Users</Typography>
                        </Grid>

                        <Grid item>
                            <Select
                                sx={{ width: 170, height: 30, outlineColor: kGreenColor, border: `1px solid ${kGreenColor}` }}
                                value={usersFilterType}
                                onChange={e => {
                                    setUsersFillterType(e.target.value)
                                }}
                            >
                                <MenuItem value='ALLTIME'>All Time</MenuItem>
                                <MenuItem value='THISWEEK'>This Week</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    {
                        !loadingUsers && users &&
                        <Box sx={{ my: 1 }}>
                            <span style={{ color: kGreenColor, fontSize: 13 }}>Registered </span>
                            <span style={{ color: 'black', fontSize: 13 }}> Anonymous</span>
                        </Box>
                    }
                    {!loadingUsers && users && <VictoryChart

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
                                        getRegisteredUsersData()
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
                                        getAnonymousUsersData()
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
