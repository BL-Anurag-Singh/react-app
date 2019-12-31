import React, { useState } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button } from "@material-ui/core";

const colorList = [
  "#F44336",
  "#FF1744",
  "#880E4F",
  "#7B1FA2",
  "#4A148C",
  "#B388FF",
  "#1A237E",
  "#0D47A1",
  "#039BE5",
  "#006064",
  "#64DD17",
  "#2E7D32",
  "#CDDC39",
  "#AEEA00"
];

let collabaratorList = [
  { name: "anurag singh", email: "anurag.singh@bridgelabz.com" },
  { name: "honey singh", email: "anurag.singh@bridgelabz.com" },
  { name: "sourav singh", email: "anurag.singh@bridgelabz.com" },
  { name: "nagendra singh", email: "anurag.singh@bridgelabz.com" },
  { name: "xyz singh", email: "anurag.singh@bridgelabz.com" },
  { name: "abc singh", email: "anurag.singh@bridgelabz.com" },
  { name: "minesh singh", email: "anurag.singh@bridgelabz.com" },
  { name: "dilip singh", email: "anurag.singh@bridgelabz.com" },
  { name: "sunil singh", email: "anurag.singh@bridgelabz.com" },
  { name: "deepak singh", email: "anurag.singh@bridgelabz.com" },
  { name: "suhas singh", email: "anurag.singh@bridgelabz.com" },
  { name: "narayan singh", email: "anurag.singh@bridgelabz.com" },
  { name: "vidya singh", email: "anurag.singh@bridgelabz.com" },
  { name: "vaibhav singh", email: "anurag.singh@bridgelabz.com" },
  { name: "ajit singh", email: "anurag.singh@bridgelabz.com" }
];

export default function AddCollabarator(props) {
  const defaultProps = {
    options: collabaratorList,
    getOptionLabel: option => `${option.name} <${option.email}>`
  };
  const [collbarators, setCollabarators] = useState([]);

  function onChangeHandler(e, val) {
    if (val) {
      setCollabarators([...collbarators, val]);
      setTimeout(() => {
        document.getElementsByClassName("MuiAutocomplete-inputFocused")[0].value =
        "";
      })
    }
  }

  function saveHandler() {
      props.saveCollabrator(collbarators)
  }

  function cancelHandler() {
      props.closeCollabratorDialog()
  }

  return (
    <Dialog open={props.open}>
      <div style={{ width: "600px", borderRadius: "10px" }}>
        <div>
          <DialogTitle id="simple-dialog-title">Collabarator</DialogTitle>
        </div>
        <div style={{ padding: "0 16px 24px 16px" }}>
          <div
            style={{
              display: "flex",
              height: "40px",
              alignItems: "center",
              padding: "5px"
            }}
          >
            <div
              style={{
                height: "36px",
                width: "36px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "29px",
                marginRight: "15px",
                backgroundColor:
                  colorList[Math.floor(Math.random() * colorList.length)]
              }}
            >
              {"anurag singh".slice(0, 1).toUpperCase()}
            </div>
            <div>
              <p style={{ margin: 0 }}>anurag singh</p>
              <p style={{ margin: 0 }}>anurag.singh@bridgelabz.com</p>
            </div>
          </div>
          {collbarators.map(item => (
            <div
              style={{
                display: "flex",
                height: "40px",
                alignItems: "center",
                padding: "5px"
              }}
            >
              <div
                style={{
                  height: "36px",
                  width: "36px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "29px",
                  marginRight: "15px",
                  backgroundColor:
                    colorList[Math.floor(Math.random() * colorList.length)]
                }}
              >
                {item.name.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <p style={{ margin: 0 }}>{item.name}</p>
                <p style={{ margin: 0 }}>{item.email}</p>
              </div>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              height: "40px",
              padding: "5px",
              alignItems: "center"
            }}
          >
            <PersonAddIcon
              style={{
                height: "30px",
                width: "30px",
                marginRight: "15px",
                marginTop: "15px"
              }}
            ></PersonAddIcon>
            <Autocomplete
              style={{ width: "380px" }}
              {...defaultProps}
              id=""
              freeSolo={true}
              onChange={onChangeHandler}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Person or email to share with"
                  margin="normal"
                  fullWidth
                />
              )}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginLeft: "300px",
            width: "251px",
            overflow: "hidden"
          }}
        >
          <Button onClick={() => cancelHandler()}>Cancel</Button>
          <Button onClick={() => saveHandler()}>Save</Button>
        </div>
      </div>
      <div></div>
    </Dialog>
  );
}
