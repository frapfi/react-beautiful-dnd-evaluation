# DragDropContext

In order to use drag and drop, you need to have the part of your React tree that
you want to be able to use drag and drop in wrapped in a DragDropContext
    - onDragStart (optional)
        - initial.draggableId: the id of the Draggable that is now dragging
        - initial.type: the type of the Draggable that is now dragging
        - initial.source: the location (droppableId and index) of where the dragging item has started within a Droppable
    - onDragEnd (required)
        - result.draggableId: the id of the Draggable that was dragging.
        - result.type: the type of the Draggable that was dragging.
        - result.source: the location where the Draggable started.
        - result.destination: the location where the Draggable finished. The destination will be
          null if the user dropped into no position (such as outside any list) or if they dropped
          the Draggable back into the same position in which it started.

## Notes on

  Synchronous reordering:

    Because this library does not control your state, it is up to you to synchronously reorder
    your lists based on the result

    - if source.droppableId (e.g."droppable-1") equals destination.droppableId you need to remove the item from your list
    and insert it at the correct position
    - if source.droppableId (e.g."droppable-1") does not equal destination.droppableId, then you need to remove the Draggable from the
    source.droppableId list and add it into the correct position of the destination.droppableId list

  Persisting a reorder:

    If you need to persist a reorder to a remote data store - update the list synchronously on the client
    and fire off a request in the background to persist the change. If the remote save fails it is up to
    you how to communicate that to the user and update, or not update, the list


# Droppable

Droppable components can be dropped on by a Draggable. They also contain Draggables. A Draggable must
be contained within a Droppable

 - Children function: The React children of a Droppable must be a function (with 2 args) that returns a ReactElement
    -  **provided.innerRef** In order for the droppable to function correctly, you must bind the provided.innerRef
    -  **provided.placeholder** This is used to create space in the Droppable as needed during a drag

   <Droppable droppableId="droppable-1">
     {(provided, snapshot) => (
       <div
            ref={provided.innerRef}
            style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
       >
         Good to go (Replace wti)
         {provided.placeholder}
       </div>
     )}
   </Droppable

   - The children function is also provided with a small amount of state (**snapshot**) relating to the current drag state

It is recommended that you put a *min-height* on a vertical Droppable or a *min-width* on a horizontal Droppable.
Otherwise when the Droppable is empty there may not be enough of a target for Draggable being dragged with touch or mouse inputs to be over the Droppable

# Draggable

Draggable components can be dragged around and dropped onto Droppables. A Draggable must always be
contained within a Droppable. It is possible to reorder a Draggable within its home Droppable or move
to another Droppable. It is possible because a Droppable is free to control what it allows to be dropped on it

<Draggable draggableId="draggable-1" type="PERSON">
  {(provided, snapshot) => (
    <div>
      <div
        ref={provided.innerRef}
        style={provided.draggableStyle}
        {...provided.dragHandleProps}
      >
        <h4>My draggable</h4>
      </div>
      {provided.placeholder}
    </div>
  )}
</Draggable>;

- Children function: The React children of a Droppable must be a function (with 2 args) that returns a ReactElement
    -  **provided.innerRef** In order for the droppable to function correctly, you must bind the provided.innerRef
    -  **provided.placeholder** This is used to create space in the Droppable as needed during a drag

- Draggables should be visible siblings

Working:

/ Direct siblings ✅
<Draggable draggableId="draggable-1" >
  {() => {}}
</Draggable>
<Draggable draggableId="draggable-2">
  {() => {}}
</Draggable>

// Not direct siblings, but are visual siblings ✅
<div>
  <Draggable draggableId="draggable-1">
    {() => {}}
  </Draggable>
</div>
<div>
  <Draggable draggableId="draggable-2">
    {() => {}}
  </Draggable>
</div>

Not working:

// Spacer elements ❌
<Draggable draggableId="draggable-1">
    {() => {}}
</Draggable>
<p>I will break things!</p>
<Draggable draggableId="draggable-2">
    {() => {}}
</Draggable>

// Spacing on non sibling wrappers ❌
<div style={{padding: 10}}>
  <Draggable draggableId="draggable-1">
    {() => {}}
  </Draggable>
</div>
<div style={{padding: 10}}>
  <Draggable draggableId="draggable-2">
    {() => {}}
  </Draggable>
</div>


- **provided.dragHandleProps**: every Draggable has a drag handle
    - This is a number of props that need to be applied to the Draggable node. The simplest approach is to spread the props onto the draggable node ({...provided.dragHandleProps}).
    However, you are also welcome to monkey patch these props if you also need to respond to them


