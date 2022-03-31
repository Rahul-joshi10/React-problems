import React, { useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import grapData from '../graphData.json';



function GraphComp() {
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);
    const [nodeClicked, setNodeClicked] = useState([]);

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
                linkColor={(data) => {
                    if (nodeClicked.indexOf(data.source.id) !== -1) {
                        return 'red'
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
                    ctx.fillText(label, node.x, node.y + 6);
                }}
                nodeVisibility={true}
            />
        </div>
    )
}

export default GraphComp