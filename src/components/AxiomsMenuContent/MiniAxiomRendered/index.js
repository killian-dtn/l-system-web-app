import { Graphics, Stage } from '@pixi/react-pixi';
import { Point } from 'pixi.js';
import React from 'react';
import './style.css';

export default class MiniAxiomRendered extends React.Component {
    render() {
        const w = (this.props.width ?? 30);
        const h = (this.props.height ?? 30);
        return (
            <li>
                <span>{this.props.name}</span>
                <Stage width={w} height={h} options={{ backgroundAlpha: 0 }}>
                    <Graphics draw={g => {
                        const rotate = (n, p) => new Point(
                            p.x * Math.cos(n) - p.y * Math.sin(n),
                            p.x * Math.sin(n) + p.y * Math.cos(n)
                        );

                        const branchSize = h * (1 / 2);
                        const angle = Math.PI / 6;

                        let curPos = new Point(w / 2, h);
                        let curDir = new Point(0, -1).multiplyScalar(branchSize);
                        let stack = [];

                        g.clear()
                        .lineStyle(5, 0x002613, 1)
                        .moveTo(curPos.x, curPos.y);
                        
                        // F
                        curPos = curPos.add(curDir);
                        g.lineTo(curPos.x, curPos.y);

                        // [
                        stack.push([curPos.clone(), curDir.clone()]);

                        // -
                        curDir = rotate(-angle, curDir).normalize().multiplyScalar(branchSize);

                        // F
                        curPos = curPos.add(curDir);
                        g.lineTo(curPos.x, curPos.y);

                        // ]
                        [curPos, curDir] = stack.pop();
                        g.moveTo(curPos.x, curPos.y);

                        // +
                        curDir = rotate(angle, curDir).normalize().multiplyScalar(branchSize);

                        // F
                        curPos = curPos.add(curDir);
                        g.lineTo(curPos.x, curPos.y);
                    }}/>
                </Stage>
            </li>
        );
    }
}