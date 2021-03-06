import React from "react";
import { AppBar, Hidden, Icon } from "@material-ui/core";
import { FuseScrollbars } from "@fuse";
import clsx from "clsx";
import UserNavbarHeader from "app/fuse-layouts/shared-components/UserNavbarHeader";
import NavbarFoldedToggleButton from "app/fuse-layouts/shared-components/NavbarFoldedToggleButton";
import NavbarMobileToggleButton from "app/fuse-layouts/shared-components/NavbarMobileToggleButton";
import Navigation from "app/fuse-layouts/shared-components/Navigation";
import { makeStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  content: {
    overflowX: "hidden",
    overflowY: "auto",
    "-webkit-overflow-scrolling": "touch",
    background:
      "linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 30%), linear-gradient(rgba(0, 0, 0, 0.25) 0, rgba(0, 0, 0, 0) 40%)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 40px, 100% 10px",
    backgroundAttachment: "local, scroll",
  },
});

function NavbarLayout1(props) {
  const classes = useStyles();
  const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
  const navbar = useSelector(({ fuse }) => fuse.navbar);
  const folded = config.navbar.folded;
  const foldedAndClosed = folded && !navbar.foldedOpen;
  // const foldedAndOpened = folded && navbar.foldedOpen;

  return (
    <div
      className={clsx("flex flex-col overflow-hidden h-full", props.className)}
    >
      <AppBar
        color="primary"
        position="static"
        elevation={0}
        className="flex flex-row items-center flex-shrink h-64 min-h-64 pl-5 pr-12"
      >
        <div className="flex justify-center">
          <Hidden mdDown>
            <NavbarFoldedToggleButton className="w-40 h-40 p-2" />
          </Hidden>
        </div>

        <Hidden lgUp>
          <NavbarMobileToggleButton className="w-40 h-40 p-0">
            <Icon>arrow_back</Icon>
          </NavbarMobileToggleButton>
        </Hidden>
      </AppBar>
      {!foldedAndClosed && (
        <FuseScrollbars className={clsx(classes.content)}>
          <UserNavbarHeader />

          <Navigation layout="vertical" />
        </FuseScrollbars>
      )}
    </div>
  );
}

export default NavbarLayout1;
