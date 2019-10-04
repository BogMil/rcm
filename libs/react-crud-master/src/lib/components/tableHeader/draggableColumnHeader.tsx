import React, { useRef } from 'react'
import { useDrag, useDrop, DropTargetMonitor, DragSource, DropTarget } from 'react-dnd'
import { XYCoord } from 'dnd-core'
import { Button } from 'react-bootstrap'
import { ColModel } from '../../types/colModel'

const style = {
    // border: '1px dashed gray',
    padding: '0px',
    marginBottom: '0',
    backgroundColor: 'white',
    cursor: 'move',
}

export interface CardProps {
    column: ColModel
    // id: any
    // text: string
    // index: number
    moveCard: (dragIndex: number, hoverIndex: number) => void,
    onThClick: () => void
    onClick: () => void,
    onMouseDown: (e: any) => void
}

interface DragItem {
    index: number
    id: string
    type: string
    column: ColModel
}
const DraggableColumnHeader: React.FC<CardProps> = ({ column, moveCard, onThClick, onClick, onMouseDown }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'CARD',
        hover(item: DragItem, monitor: DropTargetMonitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.column.columnPosition
            const hoverIndex = column.columnPosition

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current!.getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2
            const hoverLeftX = hoverBoundingRect.left

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the top
            const hoverClientXLeft = (clientOffset as XYCoord).x - hoverBoundingRect.left
            const hoverClientXRight = (clientOffset as XYCoord).x


            // Dragging right
            if (dragIndex < hoverIndex && hoverClientXLeft < hoverMiddleX - 40) {
                return
            }

            // Dragging right
            if (dragIndex > hoverIndex && (hoverClientXLeft > hoverMiddleX + 40)) {
                return
            }

            if (dragIndex > hoverIndex && hoverClientXLeft > hoverBoundingRect.left && hoverClientXRight > hoverBoundingRect.right) {
                return
            }

            // moveCard(dragIndex, hoverIndex)

            item.index = hoverIndex
        },
        drop(item: DragItem, monitor: DropTargetMonitor) {
            moveCard(item.column.columnPosition, column.columnPosition)
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: 'CARD', column: column },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0.5 : 1
    const stylex = canDrop ? 'red' : 'transparent'
    return drop(
        preview(
            <div style={{ opacity, backgroundColor: stylex }}>
                <div className="cm-column-header-content-holder" ref={ref}>
                    <div className="cm-column-header-label" onClick={() => onThClick()}>

                        {drag(<div onClick={e => e.stopPropagation()} style={{ ...style, opacity, width: 20, height: 8, padding: 0, margin: 0, position: 'absolute', top: 0, left: column.width / 2 - 10, backgroundColor: 'green' }}></div>)}
                        <div>{column.orderDirection != "" && `${column.orderDirection} `}{column.label}</div>
                    </div>
                    < div className="cm-column-header-menu-holder">
                        <Button
                            onClick={() => onClick()}
                            size="sm"
                            className="border-radius-0 cm-column-header-menu-btn"
                            style={{ marginRight: 5, marginLeft: 5, padding: '1px 4px' }}
                        >
                            <i style={{ padding: 0 }} className="fas fa-sliders-h"></i>
                        </Button>
                    </div>
                </div>
                <div className="cm-column-header-resize-bar"
                    onDragStart={e => e.preventDefault()}
                    onMouseDown={e => onMouseDown(e)}
                >
                    &nbsp;</div>
            </div>
            // <div ref={ref} style={{ ...style, opacity }}>
            //     {text}
            // </div>
        ))
}

// export default DraggableColumnHeader

export default DragSource(
    'CARD',
    {
        beginDrag: () => ({}),
    },
    (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    }),
)(
    DropTarget('CARD', {}, (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isDraggingHover: monitor.isOver({ shallow: true }),
        isOver: monitor.isOver(),
    }))(DraggableColumnHeader),
)