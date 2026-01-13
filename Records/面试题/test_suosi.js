function generateTriangle(n) {
    // Initialize grid
    const grid = [];
    for (let i = 0; i < n; i++) {
        grid[i] = new Array(i + 1).fill(0);
    }

    let x = 0, y = 0;
    let currentNum = 1;
    const maxNum = n * (n + 1) / 2;
    
    // Directions: Down, Right, Up-Left
    // 0: Down (1, 0)
    // 1: Right (0, 1)
    // 2: Up-Left (-1, -1)
    let dir = 0; 
    const dx = [1, 0, -1];
    const dy = [0, 1, -1];

    while (currentNum <= maxNum) {
        grid[x][y] = currentNum;
        currentNum++;

        if (currentNum > maxNum) break;

        // Try moving in current direction
        let nextX = x + dx[dir];
        let nextY = y + dy[dir];

        // Check validity
        let valid = false;
        if (nextX >= 0 && nextX < n && nextY >= 0 && nextY <= nextX) {
            if (grid[nextX][nextY] === 0) {
                valid = true;
            }
        }

        if (!valid) {
            // Change direction
            dir = (dir + 1) % 3;
            nextX = x + dx[dir];
            nextY = y + dy[dir];
        }

        x = nextX;
        y = nextY;
    }

    // Print
    for (let i = 0; i < n; i++) {
        console.log(grid[i].join(' '));
    }
}

console.log("n=5:");
generateTriangle(5);
