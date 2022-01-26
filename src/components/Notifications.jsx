import { NotificationsOutlined, VisibilityOutlined, } from "@mui/icons-material"
import { Badge, Button, Grid, IconButton, Popover, Skeleton, Typography, } from "@mui/material"
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react"
import { collectionData } from "rxfire/firestore";
import { useAuth } from "../hooks/auth";
import { notificationQuery } from "../query/query";
import { markNotificationAsRead } from "../utils/firebase/blog_management";

const CustomNotifications = () => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState()
    const [loadingNotifications, setLoadingNotifications] = useState(false)

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (user) {
            collectionData(notificationQuery(user.uid), { idField: 'id' }).subscribe(ns => {
                setLoadingNotifications(true)
                setNotifications(ns)
                setLoadingNotifications(false)
            })
        }
        return () => {

        }
    }, [])
    return (
        <>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                {!loadingNotifications && notifications &&
                    notifications.map(notification => {
                        return <Grid container sx={{ p: 2 }} alignItems='center'>
                            <Grid item sx={{ mr: 5 }}>
                                <Typography sx={{ fontWeight: 'bold', fontSize: 14, color: 'black', mb: 1 }}>{notification.notification}</Typography>
                                {/* <Typography sx={{ fontSize: 12, color: 'black' }}>{notification.timestamp}</Typography> */}
                            </Grid>
                            <Grid item>
                                {!notification.seen && <IconButton onClick={() => {
                                    markNotificationAsRead(notification.id)
                                }} size='small' ><VisibilityOutlined></VisibilityOutlined></IconButton>}
                            </Grid>
                        </Grid>
                    })
                }
            </Popover>

            {!loadingNotifications && notifications && <Badge badgeContent={4}>

                <Badge badgeContent={notifications.filter(n => !n.seen).length} color='success'>
                    <IconButton onClick={handleClick}>
                        <NotificationsOutlined color="action" />
                    </IconButton>
                </Badge>
            </Badge>}
            {
                loadingNotifications && <Skeleton variant='circular' />
            }
        </>
    )
}

export default CustomNotifications