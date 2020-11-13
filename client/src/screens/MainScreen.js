import React from "react";
import StaffList from "../components/StaffList";
import { Container } from "@material-ui/core";
import Header from "../components/Header";

export default function MainScreen() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <StaffList />
      </Container>
    </>
  );
}
