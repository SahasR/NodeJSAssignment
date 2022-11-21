//Testing simple equality statements with the use of toBe

test('Testing simple addition of 1 + 1', () => {
    expect(1+1).toBe(2);
});

test('Testing simple addition of 1 + 1', () => {
    expect(2+1).toBe(3);
});

//Testing simple equality objects 

test('object assignment', () => {
    const data = {one: 1};
    data['two'] = 2;
    expect(data).toStrictEqual({one: 1, two: 2});
  });

test('adding positive numbers is not zero', () => {
    for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
    expect(a + b).not.toBe(0);
    }
    }
});

test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  });
  
  test('zero', () => {
    const z = 0;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
  });


test('adding floating point numbers', () => {
    const value = 0.1 + 0.2;
    expect(value).toBe(0.3);           //This won't work because of rounding error
    expect(value).toBeCloseTo(0.3); // This works.
});


