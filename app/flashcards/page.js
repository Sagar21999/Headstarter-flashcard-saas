'use client'

import { useUser } from "@clerk/nextjs"
import { useState, useEffect } from "react"

import { CollectionReference,doc,collection, getDoc, setDoc } from "firebase/firestore"
import db from "@/firebase"
import { useRouter } from "next/navigation"
import { Card, Container, CardActionArea, CardContent, Grid, Typography } from "@mui/material"

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()
  
    // ... (rest of the component)

    useEffect(() => {
        async function getFlashcards() {
          if (!user) return
          const docRef = doc(collection(db, 'users'), user.id)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            // console.log(docSnap)
            const collections = docSnap.data().flashcardSets || []
            // console.log(collections)
            setFlashcards(collections)
          } else {
            await setDoc(docRef, { flashcards: [] })
          }
        }
        getFlashcards()
      }, [user])

      if (!isLoaded || !isSignedIn){
        return <></>
      }

      const handleCardClick = (id) =>{
        router.push(`/flashcard?id=${id}`)
      }

      return (
        <Container maxWidth="md">
          <Grid container spacing={3} sx={{ mt: 4 }}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {flashcard.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )
  }