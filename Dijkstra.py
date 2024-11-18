import heapq

def Dijkstra(_adjacencyMatrix, _distanceMatrix, _start, _end):

    num_nodes = len(_adjacencyMatrix)
    distances = [float('inf')] * num_nodes  
    previous_nodes = [None] * num_nodes  
    distances[_start] = 0 

    pq = [(0, _start)]  

    while pq:
        current_distance, current_node = heapq.heappop(pq)

        if current_node == _end:
            break 

        for neighbor in range(num_nodes):
            if _adjacencyMatrix[current_node][neighbor] != 0:  
                new_distance = current_distance + _distanceMatrix[current_node][neighbor]

                if new_distance < distances[neighbor]:
                    distances[neighbor] = new_distance
                    previous_nodes[neighbor] = current_node
                    heapq.heappush(pq, (new_distance, neighbor))

    path = []
    current_node = _end
    while current_node is not None:
        path.append(current_node)
        current_node = previous_nodes[current_node]

    path.reverse()  
    return path
