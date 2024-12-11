import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import './CSS/Main.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
           
      const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
      }
    
        setState({ ...state, [anchor]: open });
      };

      const handleLinkClick = (path) => {
        
        navigate(path); 
        toggleDrawer("left", false)(); 
         };

      const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
            {['Student'].map((text, index) => (
              <ListItem key={text} disablePadding>
                
                <ListItemButton onClick={() => handleLinkClick("/student")}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider/>
          <List>
            {['Admin'].map((text, index) => (
              <ListItem key={text} disablePadding>
               <ListItemButton onClick={() => handleLinkClick("/admin")}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
                </ListItem>
            ))}
          </List>
          <Divider/>
          <List>
            {['Courses'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => handleLinkClick("/Courses")}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
                </ListItem>
            ))}
          </List>
          <Divider/>
          <List>
            {['Question Bank'].map((text, index) => (
              <ListItem key={text} disablePadding>
                 <ListItemButton onClick={() => handleLinkClick("/QuestionBank")}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider/>
          <List>
            {['ExamPage'].map((text, index) => (
              <ListItem key={text} disablePadding>
                 <ListItemButton onClick={() => handleLinkClick("/exam")}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider/>
          <List>
            {['Settings'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => handleLinkClick("/settings")}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      );

  return (
     <div className='main'>
      <div className='menu-container'> 
       <MenuIcon 
        onClick={toggleDrawer("left",true)
        }
        sx={{fontSize:40}}
        />
        <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
        </Drawer>
     </div>
     
      <div className="grid-container">
                <Link to = "/Courses" ><div className="grid-item">JEE</div></Link>
                <Link to = "/Courses" ><div className="grid-item">GATE</div></Link>
                <Link to = "/Courses" ><div className="grid-item">UPSC(ALL GROUPS)</div></Link>
                <Link to = "/Courses" ><div className="grid-item">BANKING</div></Link>
                <Link to = "/Courses" ><div className="grid-item">RAILWAYS</div></Link>
        </div>
       </div>
    );
}

export default Main