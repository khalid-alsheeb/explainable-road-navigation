import React from "react";
import { Typography} from "@material-ui/core";
import Container from 'react-bootstrap/Container';
import { useSelector } from "react-redux";
import BetterLine from "../others/BetterLine";

const Explanations = () => {

    const explanations = useSelector((state) => state.explanations);

    const reasons = explanations[0]
    const solutions = explanations[1]

    return (
        <Container style={{ marginBottom: '10%'}}>
            { explanations.length > 1 ?
                <>
                    <Typography variant="h6" color="textSecondary" align="left" style={{color: 'white'}}>
                        The desired path is not optimal because:
                    </Typography>
                    <ol  style={{ listStyleType: "upper-roman", color: 'rgb(255, 145, 0)' }} >

                        { reasons.map((r) => 
                            <li>
                                <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                                    {r}
                                </Typography>
                            </li>
                        )}
                    </ol>

                    <BetterLine />

                    <Typography variant="h6" color="textSecondary" align="left" style={{color: 'white'}}>
                        If the following changes (in pink) were true, then the desired path would be optimal:
                    </Typography>
                    <ol  style={{ listStyleType: "upper-roman", color: 'rgb(255, 145, 0)' }} >

                        { solutions.map((s) => 
                            <li>
                                <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                                    {s}
                                </Typography>
                            </li>
                        )}
                    </ol>
                </>
            : explanations[0] === 'Infeasible' ?
                <>
                    <Typography variant="h6" color="textSecondary" align="left" style={{color: 'white'}}>
                        This specific problem is Infeasible.
                    </Typography>
                </>
            : explanations[0] === 'SP=DP' ?
                <>
                    <Typography variant="h6" color="textSecondary" align="left" style={{color: 'white'}}>
                        This desired path is the optimal path.
                    </Typography>
                </>
            : explanations[0] === 'NO SP' ?
                <>
                    <Typography variant="h6" color="textSecondary" align="left" style={{color: 'white'}}>
                        There is not shortest path, so the algorithm cannot be applied.
                    </Typography>
                </>
            : explanations[0] === 'NO Nodes' ?
                <>
                    <Typography variant="h6" color="textSecondary" align="left" style={{color: 'white'}}>
                        Please add some nodes.
                    </Typography>
                </>
            : explanations[0] === 'Infeasible-AT' ?
            <>
                <Typography variant="h6" color="textSecondary" align="left" style={{color: 'white'}}>
                    This specific problem is Infeasible - within our time limit.
                </Typography>
            </>
            : explanations[0] === 'No Target' ?
            <>
                <Typography variant="h6" color="textSecondary" align="left" style={{color: 'white'}}>
                    Please finish your desired path, to the target node.
                </Typography>
            </>
            :
                <>
                </>
            }
        </Container>

    );
}

export default Explanations;