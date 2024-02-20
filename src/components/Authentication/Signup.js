import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [confirmPassword,setConfirmPassword]=useState();
    const [pic,setPic]=useState();
    const [show,setShow]=useState();
    const [loading,setLoading]=useState(false);
    const toast=useToast();
    const navigate=useNavigate();

    const handleClick=()=>{
        setShow(!show);
    }
    const postDetails=(pics)=>{
        setLoading(true);
        
        if(pics === undefined){
            toast({
                title:"please select an image",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom"
            });
            return;
        }
        if(pics.type === "image/jpeg" || pics.type === "image/png"){
            const data=new FormData();
            data.append("file",pics);
            data.append("upload_preset","chat-app");
            data.append("cloud_name", "dg2l8ym3u");
            fetch("https://api.cloudinary.com/v1_1/dg2l8ym3u/image/upload",{
                method:"post",
                body:data,
            }).then((res)=>res.json())
                .then(data=>{
                    setPic(data.url.toString());
                    console.log(data.url.toString());
                    setLoading(false)
                })
                .catch((err)=>{
                    console.log(err);
                    setLoading(false);
                });
        }else{
            toast({
              title: "please select an image",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            setLoading(false);
            return;
        }
    }
    const submitHandler=async()=>{
        setLoading(true);
        if(!name || !email || !password || !confirmPassword){
            toast({
              title: "please fill all the fields",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            setLoading(false);
            return;
        }
        if(password !== confirmPassword){
            toast({
              title: "passwords and confirm password don't match",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            return;
        }

       try{ 
            const config={
                header:{
                    "Content-type":"applicaiton/json"
                },
            };

            const {data}=await axios.post("/api/user",{name,email,password,pic},config);
            toast({
              title: "Registration Successfull",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            localStorage.setItem('userInfo',JSON.stringify(data));

            setLoading(false);
            navigate('/chat');

        }catch(err){

                toast({
                  title: "Error occured",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                  position: "bottom",
                });
                setLoading(false);
        }
    }

  return (
    <VStack spacing={"5px"} color={"black"}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <InputRightElement width={"4.5rem"}>
            <Button onClick={handleClick} h="1.75rem" size="sm">
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <InputRightElement width={"4.5rem"}>
            <Button onClick={handleClick} h="1.75rem" size="sm">
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
            <FormLabel>
                Upload Your Picture
            </FormLabel>
            <Input
                type="file"
                p={1.5}
                accept="image/"
                onChange={(e)=>postDetails(e.target.files[0])}
            
            />
      </FormControl>

      <Button
      colorScheme='blue'
      width={"100%"}
      style={{marginTop:15}}
      onClick={submitHandler}
      isLoading={loading}
      >
           Sign up 
      </Button>

    </VStack>
  );
}

export default Signup