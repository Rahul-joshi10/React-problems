import React, { useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import grapData from '../graphData.json';


function GraphComp() {
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);
    const [nodeClicked, setNodeClicked] = useState([]);
    const [nodeTargets, setNodeTargets] = useState([]);

    useEffect(() => {
        let tempNodes = [];
        let tempLinks = [];

        grapData.forEach(data => {
            tempNodes.push(...data.members, data.organization);
            data.members.forEach(member => {
                tempLinks.push({
                    "source": member.din,
                    "target": data.organization.cin
                })
            })
        })
        let nodeData = tempNodes.map(data => {
            return {
                id: data.din ? data.din : data.cin,
                ...data
            }
        });
        setNodes(nodeData)
        setLinks(tempLinks)

    }, [])

    const onNodeClick = (node) => {
        if (!node.cin) {
            let nodeArr = [];
            if (nodeClicked.indexOf(node.id) === -1) {
                setNodeClicked([...nodeClicked, node.id]);
            } else {
                nodeArr = [...nodeClicked]
                let nodeIndex = nodeArr.indexOf(node.id);
                nodeArr.splice(nodeIndex, 1);
                setNodeClicked(nodeArr);
            }
        }

    }

    useEffect(() => {
        let linkArr = [];
        let allArr = [];

        nodeClicked.forEach(node => {
            links.forEach(link => {
                if (node === link.source.id) {
                    linkArr.push(link.target.id)
                }
            })
            if (linkArr.length > 0) {
                allArr.push(linkArr);
            }
            linkArr = []
        })

        if (allArr.length > 0) {
            let results = allArr.reduce((prev, curr) => prev.filter(e => curr.includes(e)))
            setNodeTargets(results)
        }

        if (allArr.length === 0) {
            setNodeTargets([])
        }

    }, [nodeClicked]);

    return (
        <div>
            <ForceGraph2D
                graphData={
                    {
                        "nodes": nodes,
                        "links": links
                    }
                }
                nodeRelSize={6}
                nodeColor={(node) => {
                    if (nodeTargets.indexOf(node.id) !== -1 || nodeClicked.indexOf(node.id) !== -1) {
                        return 'green'
                    }
                }}

                linkColor={(data) => {
                    if (nodeTargets.indexOf(data.target.id) !== -1) {
                        return 'green'
                    } else {
                        return 'black'
                    }

                }}
                onNodeClick={onNodeClick}
                nodeCanvasObjectMode={() => 'after'}
                nodeCanvasObject={(node, ctx, globalScale) => {
                    const label = node.name;
                    const fontSize = 12 / globalScale;
                    ctx.font = `${fontSize}px Sans-Serif`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = 'black'; //node.color;
                    ctx.fillText(label, node.x, node.y + 6); //Label and it's position
                }}
            />
        </div>
    )
}

export default GraphComp