import { useState } from "react"
import { VscAdd, VscFilter } from "react-icons/vsc"
import { IconButton, Menu, Portal, Input, Box, Grid, GridItem, MenuItemGroup } from "@chakra-ui/react"
import { ColorModeButton } from "./ui/color-mode"
import { TbArrowsDownUp } from "react-icons/tb"

interface AddTodoProps {
    addTask: (newText: string)=> void
    handleNewDateTasks(): void
    handleOldDateTasks(): void
    handleDoneTasks(): void
    handleUndoneTasks(): void
    handleSortDone(): void
    handleSortUndone(): void
    handleSortAll(): void
}

export default function AddTodo({ 
    addTask, 
    handleNewDateTasks, 
    handleOldDateTasks, 
    handleDoneTasks, 
    handleUndoneTasks, 
    handleSortDone,
    handleSortUndone,
    handleSortAll,
}: AddTodoProps) {

    const [value, setValue] = useState<string>('')
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value)
        setIsButtonDisabled(false)
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === 'Enter') {
        handleAddTask()
        }
    }

    function handleAddTask() {
        if (value.trim() !== '') {
            addTask(value)
            setValue('')
        }
        else {
            setIsButtonDisabled(true)
            alert('Поле ввода не может быть пустым!')
        }
    }

    return(
        <Box> 
            <Grid templateColumns="auto 1fr auto auto auto" gap={6} alignItems="center">
                
                <GridItem display="flex" justifyContent="center">
                    <IconButton 
                        onClick={handleAddTask}
                        size="lg"
                        variant="ghost"
                        disabled={isButtonDisabled}
                    >
                        <VscAdd />  
                    </IconButton>
                </GridItem>
                <GridItem>
                    <Input
                        size = 'lg'
                        variant="flushed"  
                        type="text"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        value={value}
                        placeholder="Введите задачу..."
                    />
                </GridItem>

                <GridItem display="flex" justifyContent="center">
                    <Menu.Root>
                        <Menu.Trigger asChild >
                        <IconButton    
                            size="lg"
                            variant="ghost"    
                        >
                            <VscFilter />  
                            </IconButton>
                        </Menu.Trigger>
                        <Portal>
                        <Menu.Positioner>
                            <Menu.Content>
                                <MenuItemGroup>
                                    <Menu.ItemGroupLabel>Показать:</Menu.ItemGroupLabel>
                                    <Menu.Item value="active" onClick={()=>handleSortUndone()}>Активные</Menu.Item>
                                    <Menu.Item value="done" onClick={()=>handleSortDone()}>Завершенные</Menu.Item>
                                    <Menu.Item value="all" onClick={()=>handleSortAll()}>Все</Menu.Item>
                                </MenuItemGroup>
                            </Menu.Content>
                        </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
                </GridItem>

                <GridItem display="flex" justifyContent="center">
                    <Menu.Root>
                        <Menu.Trigger asChild >
                        <IconButton    
                            size="lg"
                            variant="ghost"    
                        >
                            <TbArrowsDownUp />  
                            </IconButton>
                        </Menu.Trigger>
                        <Portal>
                        <Menu.Positioner>
                            <Menu.Content>
                                <MenuItemGroup>
                                    <Menu.ItemGroupLabel>Сначала:</Menu.ItemGroupLabel>
                                    <Menu.Item value="undone" onClick={()=>handleUndoneTasks()}>Активные</Menu.Item>
                                    <Menu.Item value="done" onClick={()=> handleDoneTasks()}>Завершенные</Menu.Item>
                                    <Menu.Item value="newDate" onClick={()=>handleNewDateTasks()}>Новые</Menu.Item>
                                    <Menu.Item value="oldDate" onClick={()=>handleOldDateTasks()}>Старые</Menu.Item>
                                </MenuItemGroup>
                            </Menu.Content>
                        </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
                </GridItem>

                <GridItem display="flex" justifyContent="center">
                    <ColorModeButton />
                </GridItem>

            </Grid>
        </Box>
    )
    }