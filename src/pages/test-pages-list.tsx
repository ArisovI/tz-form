import { Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

const TestPagesList = () => {
    const navigate = useNavigate()
    return (
        <div>
            <Button onClick={() => navigate('/create')}>
                Create
            </Button>

            <Button onClick={() => navigate('/edit/1')}>
                Edit
            </Button>
        </div>
    )
}

export default TestPagesList