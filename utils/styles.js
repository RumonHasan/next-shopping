import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    navBar:{
        backgroundColor: "#203040",
        '& a':{
            color:'#ffffff',
            marginLeft: 10,
        }
    },
    brand:{
        fontSize:'1.5rem',
        fontWeight:'bold',
    },
    grow:{
        flexGrow:1,
    },
    main:{
        minHeight:'80vh',
    },
    footer:{
        textAlign:'center',
        marginTop:10,
    },
    section:{
        marginTop:10,
        marginBottom: 10
    },
    form:{
        maxWidth: '800px',
        margin: '0 auto',
    },
    navbarBtn:{
        color:'white',
        textTransform: 'initial',
    }
})

export default useStyles;