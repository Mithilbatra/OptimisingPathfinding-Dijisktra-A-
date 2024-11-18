def AStar(_adjacencyMatrix, _distanceMatrix, _start, _end) :
	listOfPath = [_start]
	closestInAdj = []
	next = _start		
	prev = _start	
	distanceSaved = 0	
	closestInAdj.append(_start)			
	closestInAdj.append(distanceSaved)		
	
	while (next != _end) :
		closestInAdj = subAStar(_adjacencyMatrix, _distanceMatrix, next, prev, _end, distanceSaved)
		prev = next
		next = closestInAdj[0]
		distanceSaved = closestInAdj[1]		
		listOfPath.append(next)	
	return listOfPath
	

def subAStar(_adjacencyMatrix, _distanceMatrix, current, prev, _end, distanceSaved) :

	closest = []
	closest.append(current) 															
	closest.append(getLongestDistance(current, _end, _distanceMatrix, distanceSaved))	
	
	for i in range(len(_adjacencyMatrix[current])) :
		if (i != prev and _adjacencyMatrix[current][i] != 0) :
			if (getFn(current, i, _end, distanceSaved, _distanceMatrix) < closest[1]) :
				closest[0] = i 
				closest[1] = getFn(current, i, _end, distanceSaved, _distanceMatrix)
			elif (getFn(current, i, _end, distanceSaved, _distanceMatrix) == closest[1]) :
				if (i == _end) :
					closest[0] = i 
					closest[1] = getFn(current, i, _end, distanceSaved, _distanceMatrix)
	closest[1] = getGn(current, i, distanceSaved, _distanceMatrix)
	return closest



def getLongestDistance (current, _end, _distanceMatrix, distanceSaved) :
	longestDistance = 0
	longestHn = 0
	for i in range(len(_distanceMatrix[current])) :
		if (_distanceMatrix[current][i] > longestDistance) :
			longestDistance = _distanceMatrix[current][i]
		if (getHn(i, _end, _distanceMatrix) > longestHn) :
			longestHn = getHn(i, _end, _distanceMatrix)			
	return (longestDistance + distanceSaved + longestHn)

def getFn(current, next, _end, distanceSaved, _distanceMatrix) :
	return getGn(current, next, distanceSaved, _distanceMatrix) + getHn(next, _end, _distanceMatrix)

def getGn(current, next, distanceSaved, _distanceMatrix) :
	return (_distanceMatrix[current][next] + distanceSaved)
	
def getHn(current, next, _distanceMatrix) :
	return _distanceMatrix[current][next]
