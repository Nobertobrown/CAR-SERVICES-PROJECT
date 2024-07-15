import { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from "react-hot-toast";

const MechanicsProfile = () => {
  const [showEdit, setShowEdit] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    // Fetch user data from localstorage
    const mechanic = JSON.parse(localStorage.getItem("user"));

    const formValues = {};
    const formData = new FormData(e.target);
    formValues["uid"] = mechanic.id;

    formData.forEach((value, key) => {
      if (value !== "") {
        formValues[key] = value.toLocaleLowerCase();
      }
    });

    try {
      const response = await axios.put(
        "http://localhost:5000/auth/mechanics",
        formValues,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Updated Successfully!");
      }
      // Redirect or show success message as needed
    } catch (error) {
      console.error("Error updating mechanic:", error);
      // Handle error state or show error message
    }
  }

  const handleEdit = () => setShowEdit(true);
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this profile!",
          text: "Here is my profile on this amazing app!",
          url: window.location.href,
        })
        .then(() => {
          console.log("Profile shared successfully");
        })
        .catch((error) => {
          console.error("Error sharing profile:", error);
        });
    } else {
      alert("Share API is not supported in this browser.");
    }
  };

  return (
    <div>
      <div className="avatar d-flex justify-content-center">
        <img
          src={"/profile.png"}
          className="bg-black rounded-circle h-25"
          alt="Profile"
        />
      </div>
      <h4 className="handler text-center py-3">Name</h4>
      <div className="d-flex justify-content-center">
        <Button className="btn btn-primary mx-3" onClick={handleEdit}>
          <FontAwesomeIcon icon={faEdit} /> Edit Profile
        </Button>
        <Button className="btn btn-primary mx-3" onClick={handleShare}>
          <FontAwesomeIcon icon={faShareAlt} /> Share Profile
        </Button>
      </div>
      <form className="activity my-5 mx-5" onSubmit={handleSubmit}>
        {/* <p className="text-black text-center display-6">
          Activity will be shown here, if any!
        </p> */}
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput0" className="form-label fs-5">
            Located At:
          </label>
          <input
            type="text"
            name="location"
            className="form-control"
            id="exampleFormControlInput0"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label fs-5">
            Experience (Years):
          </label>
          <input
            type="number"
            name="exp"
            className="form-control"
            id="exampleFormControlInput1"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleFormControlInput2" className="form-label fs-5">
            Opening Time:
          </label>
          <input
            type="time"
            name="opTime"
            className="form-control"
            id="exampleFormControlInput2"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label fs-5">
            Closing Time:
          </label>
          <input
            type="time"
            name="clTime"
            className="form-control"
            id="exampleFormControlInput3"
            required
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="exampleFormControlTextarea1"
            className="form-label fs-5"
          >
            Expertise:
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            name="desc"
            required
          />
        </div>
        <Button
          type="submit"
          className="btn btn-primary mt-3"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default MechanicsProfile;
