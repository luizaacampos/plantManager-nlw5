import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Alert, } from 'react-native'
import { formatDistance } from 'date-fns'
import { pt } from 'date-fns/locale'

import { Header } from '../components/Header'
import { PlantCardSecondary } from '../components/PlantCardSecondary'
import { Load } from '../components/Load'
import { PlantProps, loadPlant, removePlant } from '../libs/storage'
import WaterDrop from '../assets/waterdrop.png'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function MyPlants() {
    const [myPlants, setMyPlants] = useState<PlantProps[]>()
    const [loading, setLoading] = useState(true)
    const [nextWatering, setNextWatering] = useState<string>()

    function handleRemove(plant: PlantProps) {
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`,[
            {
                text: 'Não 🙏🏻',
                style: 'cancel'
            },
            {
                text: 'Sim 😅',
                onPress: async () => {
                    try {
                        await removePlant(plant.id);

                        setMyPlants((oldData) => (
                            oldData?.filter((item) => item.id !== plant.id)
                        ));
                    } catch (err) {
                        Alert.alert('Não foi possível remover! 😥');
                    }
                }
            }
        ])
    }

    useEffect(() => {
        async function loadStorageData() {
            const storagedPlants = await loadPlant()

            const nextTime = formatDistance(
                new Date(storagedPlants[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            )

            setNextWatering(
                `Não esqueça de regar a ${storagedPlants[0].name} daqui à ${nextTime}.`
            )
                setMyPlants(storagedPlants)
                setLoading(false)
        }

        loadStorageData()
    }, [])

    if (loading)
        return <Load />

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.spotlight}>
                <Image 
                    source={WaterDrop} 
                    style={styles.spotlightImage}
                />
                <Text style={styles.spotlightText}>{nextWatering}</Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas regas
                </Text>

                <FlatList
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardSecondary 
                        handleRemove={() => {handleRemove(item)}}
                        data={item} />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        backgroundColor: colors.background,
    },
    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    spotlightImage: {
        width: 60,
        height: 60,
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    },
    plants: {
        flex: 1,
        width: '100%',
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20,
    },
})
