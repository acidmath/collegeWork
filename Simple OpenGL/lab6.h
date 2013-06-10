#ifndef LAB6_H
#define LAB6_H


#define PI 3.1415


//Global Variables
const int screenWidth = 500;	   // width of screen window in pixels
const int screenHeight = 500;	   // height of screen window in pixels
//SHAPES
const int SPHERE = 0;
const int CYLINDER = 1;
const int TEAPOT = 2;
//CONTROLS
const int MOVECAM = 0;
const int ROTATECAM = 1;
const int ZOOMCAM = 2;
//DRAWING MODE
const int WIREFRAME = 0;
const int SHADE = 1;
//TRANSFORM MODE
const int TRANSLATE  = 0;
const int ROTATE = 1;
const int SCALE = 2;

const int xRot = 1;
const int yRot = 2;

const float worldWidth = 500.0;
const float worldHeight = 500.0; 

struct Vector3
{
	float x;
	float y;
	float z;
	Vector3() : x(0), y(0), z(0) {};              // constructors
    Vector3(float x, float y, float z) : x(x), y(y), z(z) {};

    // functions
	void set(float newX, float newY, float newZ);
	void set(const Vector3& rhs);
    Vector3& normalize();
	Vector3 cross(const Vector3& rhs) const;
	float dot(const Vector3& rhs) const;
    Vector3  operator-(const Vector3& rhs) const; 
    Vector3  operator*(const Vector3& rhs) const; 
    Vector3& operator*=(const float scale);       
};

void Vector3::set(float newX, float newY, float newZ) {
	x = newX;
	y = newY;
	z = newZ;
}

void Vector3::set(const Vector3& rhs) {
	x = rhs.x;
	y = rhs.y;
	z = rhs.z;
}

Vector3& Vector3::normalize() {
    float invLength = 1 / sqrtf(x*x + y*y + z*z);
    x *= invLength;
    y *= invLength;
    z *= invLength;
    return *this;
}

float Vector3::dot(const Vector3& rhs) const {
	return (x*rhs.x)+(y*rhs.y)+(z*rhs.z);
}

Vector3 Vector3::operator-(const Vector3& rhs) const {
    return Vector3(x-rhs.x, y-rhs.y, z-rhs.z);
}

Vector3 Vector3::cross(const Vector3& rhs) const {
    return Vector3(y*rhs.z - z*rhs.y, z*rhs.x - x*rhs.z, x*rhs.y - y*rhs.x);
}


// Initial values
GLdouble scale=1.0;
GLdouble tx=0.0, ty=0.0, tz=0.0;
GLdouble rotation_angle = 0.0;

// global values for camera
GLdouble eyex=10.0, eyey=10.0, eyez=10.0;
GLdouble lookx=0.0, looky=0.0, lookz=0.0;

int view=0;
int shape, cameraControl, shading, objectControl;

//FROM MAIN
bool controlCamera;
bool moveCam, rotCam, zoomCam;
//camera translation val
float eyex1, eyey1, eyez1;
//camera rotate val
float eyex2, eyey2, eyez2;
//init tranlation val
float xInit, yInit;
float xPrev, yPrev;
//how many pixels the mouse has to travel before a drag is registered
float xAcc = 2;
float yAcc = 2;
float zAcc = 2;
//the translation val
float xSens = 0.05;
float ySens = 0.04;
float zSens = 0.04;
//camera upval
float upx, upy, upz;
//shape size
float shapeSize = 1;
//shape transformation values
float objx, objy, objz;
float objAngle1, objAngle2;
float scaleFactor;
float red, green, blue;

// global values for shading
GLfloat ambient[] = {0.7f, 0.7f, 0.7f, 1.0f};
GLfloat diffuse[] = {0.6f, 0.6f, 0.6f, 1.0f};
GLfloat specular[] = {1.0f, 1.0f, 1.0f, 1.0f};
GLfloat shininess[] = {50.0f};

GLfloat position[] = {2.0f, 6.0f, 3.0f, 0.0f};
GLfloat lightIntensity[] = {0.7f, 0.7f, 0.7f, 1.0f};

GLfloat position2[] = {4.0f, -1.0f, 4.0f, 0.0f};
GLfloat lightIntensity2[] = {0.3f, 0.8f, 0.8f, 1.0f};



#endif