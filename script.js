// Code goes here
var app = angular.module('app', []);

app.factory('recognizeService', function($http) {
    return {
        recognize: function(imgLink) {
            // Link tới RestAPI đã viết ở phần 
            var url = 'https://wt-4d5f72aac0fa497b4d6c249f81b97c07-0.sandbox.auth0-extend.com/expressRecognize';
            return $http({
                method: 'POST',
                url,
                data: {
                    url: imgLink
                }
            });
        }
    }
});

app.controller('mainCtrl', function($scope, recognizeService) {
    $scope.isLoading = false;

    $scope.$watch('imageLink', function(oldValue, newValue) {
        $scope.faces = [];
        $scope.faceDisplay = [];
    });

    // Gọi hàm này khi người dùng click button "Nhận diện"
    $scope.recognize = function() {
        if ($scope.isLoading)
            return;

        $scope.isLoading = true;
        // Gọi hàm recognize của service
        recognizeService.recognize($scope.imageLink).then(result => {
            $scope.faces = result.data;

            // Dựa vào kết quả trả về để set style động cho class idol-face
            $scope.faceDisplay = result.data.map(rs => {
                return {
                    style: {
                        top: rs.face.top + 'px',
                        left: rs.face.left + 'px',
                        width: rs.face.width + 'px',
                        height: rs.face.height + 'px'
                    },
                    name: rs.idol.name
                }
            });
            $scope.isLoading = false;
        });
    }

    // Danh sách ảnh để test
    $scope.testImages = ["https://2sao.vietnamnetjsc.vn/images/2018/03/17/13/25/ngoc-trinh-490.jpg?width=272", "https://image.thanhnien.vn/1600/uploaded/minhnguyet/2018_03_08/thegioisao_keck.jpg", "http://giadinh.mediacdn.vn/2018/miule-1514855570627.jpg", "http://st.phunuonline.com.vn/staticFile/Subject/2017/07/26/miu-le_26239710.jpg", "http://afamilycdn.com/k:Td4EBEVRUi6eAzdFEeWhA6s7HNamNF/Image/2013/03/Hinh-3-06139/angela-phuong-trinh-ba-me-nhi-den-nu-hoang-thi-phi.jpg"];

    // Danh sách idol
    $scope.idols = [
        "Azai Lâm :D",
        "Ngọc Trinh",
        "Bà tưng",
        "Hường Hana",
        "Hoàng Thùy Linh",
        "Elly Trần",
        "Thuỷ Top",
        "Tâm Tít",
        "Midu",
        "Miu Lê",
        "Chi Pu",
        "Khả Ngân",
        "Angela Phương Trinh"
    ];
});
